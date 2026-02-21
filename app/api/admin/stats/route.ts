import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // 1. Total Enquiries
    const totalEnquiries = await Enquiry.countDocuments();

    // 2. Today's Enquiries
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayEnquiries = await Enquiry.countDocuments({
      createdAt: { $gte: startOfToday },
    });

    // 3. Revenue (Confirmed * 349)
    const confirmedCount = await Enquiry.countDocuments({
      status: "Confirmed",
    });
    const totalRevenue = confirmedCount * 349;

    // 4. Recent Enquiries (Top 5)
    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      totalEnquiries,
      todayEnquiries,
      totalRevenue,
      recentEnquiries,
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
