import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // Note: Public can view approved reviews, Admin can see all for moderation if needed
    // But for simplicity in the admin panel search, we'll keep it unified or separate later

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const isAdmin = !!session;

    await connectDB();

    const filter: any = {};
    if (!isAdmin) {
      filter.isApproved = true;
    }
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { comment: { $regex: query, $options: "i" } },
      ];
    }

    const total = await Review.countDocuments(filter);
    const reviews = await Review.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      data: reviews,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const review = await Review.create(body);
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 },
    );
  }
}
