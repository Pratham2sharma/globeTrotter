import { NextResponse } from "next/server";
import { connectDB } from "@/server/lib/db";
import City from "@/server/model/City";

export async function GET() {
  try {
    await connectDB();
    const cities = await City.find({ isActive: true })
      .select('name country state imageUrl')
      .sort({ name: 1 });
    return NextResponse.json({ cities });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cities" }, { status: 500 });
  }
}