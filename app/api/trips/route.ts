import { NextRequest, NextResponse } from 'next/server';
import Trip from '@/server/model/Tripcreate';
import { connectDB } from '@/server/lib/db';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('Received trip data:', body);
    
    const { destination, startDate, endDate, travelers, budget, preferences = [], activities = [], isInternational = false } = body;

    // Validate required fields
    if (!destination || !startDate || !endDate || !budget) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const tripData = {
      userId: 'temp-user-id',
      destination,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      travelers: travelers || 1,
      budget,
      preferences,
      activities,
      isInternational,
      status: 'planning' as const
    };
    
    console.log('Creating trip with data:', tripData);
    const trip = await Trip.create(tripData);
    console.log('Trip created successfully:', trip._id);

    return NextResponse.json(trip);
  } catch (error: any) {
    console.error('Trip creation error:', error);
    console.error('Error details:', error.message);
    return NextResponse.json(
      { message: 'Failed to create trip', error: error.message },
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