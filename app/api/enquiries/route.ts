import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { sendEnquiryEmail } from "@/lib/nodemailer";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// POST: Public submission of an enquiry
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    const newEnquiry = await Enquiry.create(body);

    // Send email notification to admin
    await sendEnquiryEmail(newEnquiry);

    return NextResponse.json(
      { message: "Enquiry submitted successfully", id: newEnquiry._id },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 },
    );
  }
}

// GET: Admin fetching enquiries with search and pagination
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") || "all";

    await connectDB();

    const filter: any = {};
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ];
    }
    if (status !== "all") {
      filter.status = status.charAt(0).toUpperCase() + status.slice(1);
    }

    const total = await Enquiry.countDocuments(filter);
    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      data: enquiries,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Fetch enquiries error:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 },
    );
  }
}

// PATCH: Update enquiry status (e.g., Pending -> Confirmed)
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await req.json();
    await connectDB();

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    return NextResponse.json(updatedEnquiry);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 },
    );
  }
}
