import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/lib/db";
import Trip from "@/server/model/Tripcreate";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const trips = await Trip.find({ userId })
      .select('destination startDate endDate status travelers budget')
      .sort({ startDate: 1 });

    return NextResponse.json({ trips });
  } catch (error) {
    console.error('Trips API error:', error);
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 });
  }
}