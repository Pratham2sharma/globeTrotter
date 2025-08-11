import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/lib/db";
import Activity from "@/server/model/Activity";
import City from "@/server/model/City";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Ensure City model is registered
    City;
    
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get('cityId');
    const category = searchParams.get('category');

    let query: any = {};
    if (cityId) query.cityId = cityId;
    if (category && category !== 'All') query.category = category;

    const activities = await Activity.find(query)
      .populate('cityId', 'name country state description imageUrl')
      .sort({ rating: -1, name: 1 });
    
    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Activities API error:', error);
    return NextResponse.json({ error: "Failed to fetch activities", details: error.message }, { status: 500 });
  }
}