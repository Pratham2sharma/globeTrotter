import { NextRequest, NextResponse } from 'next/server';
import Trip from '@/server/model/Tripcreate';
import { connectDB } from '@/server/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { tripId: string } }
) {
  try {
    await connectDB();
    const trip = await Trip.findById(params.tripId);
    
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(trip);
  } catch (error) {
    console.error('Trip fetch error:', error);
    return NextResponse.json({ error: "Failed to fetch trip" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { tripId: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { destination, startDate, endDate, travelers, budget, preferences, activities, isInternational } = body;

    const updatedTrip = await Trip.findByIdAndUpdate(
      params.tripId,
      {
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        travelers,
        budget,
        preferences: preferences || [],
        activities: activities || [],
        isInternational: isInternational || false,
      },
      { new: true }
    );

    if (!updatedTrip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTrip);
  } catch (error) {
    console.error('Trip update error:', error);
    return NextResponse.json({ error: "Failed to update trip" }, { status: 500 });
  }
}