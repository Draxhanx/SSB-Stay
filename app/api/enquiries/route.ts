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

    // Send email notification to admin asynchronously
    sendEnquiryEmail(newEnquiry).catch((err) =>
      console.error("Async email error:", err),
    );

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

// GET: Admin fetching all enquiries
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    return NextResponse.json(enquiries);
  } catch (error) {
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
