import { NextRequest, NextResponse } from 'next/server';
import Trip from '@/server/model/Tripcreate';
import { connectDB } from '@/server/lib/db';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { destination, startDate, endDate, travelers, budget, preferences = [], activities = [], isInternational = false } = body;

    const trip = await Trip.create({
      userId: 'temp-user-id',
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      travelers,
      budget,
      preferences,
      activities,
      isInternational,
      status: 'planning'
    });

    return NextResponse.json(trip);
  } catch (error) {
    console.error('Trip creation error:', error);
    return NextResponse.json(
      { message: 'Failed to create trip' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const trips = await Trip.find({ userId })
      .select('destination startDate endDate status travelers budget isInternational')
      .sort({ startDate: 1 });

    return NextResponse.json({ trips });
  } catch (error) {
    console.error('Trips API error:', error);
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 });
  }
}