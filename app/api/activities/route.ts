import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/lib/db";
import Activity from "@/server/model/Activity";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId');
    const category = searchParams.get('category');

    let query: any = { isActive: true };
    if (cityId) query.cityId = cityId;
    if (category && category !== 'All') query.category = category;

    const activities = await Activity.find(query)
      .populate('cityId', 'name country')
      .select('name category location price duration rating imageUrl')
      .sort({ rating: -1, name: 1 });
    
    return NextResponse.json({ activities });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}