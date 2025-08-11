import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/server/lib/db";
import Trip from "@/server/model/Tripcreate";
import User from "@/server/model/User";

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as JWTPayload;

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    await connectDB();
    const trips = await Trip.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ trips: trips || [] });
  } catch (error) {
    console.error('Trips API Error:', error);
    return NextResponse.json({ trips: [] }, { status: 200 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as JWTPayload;

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const { tripId } = await request.json();

    await connectDB();

    const deletedTrip = await Trip.findByIdAndDelete(tripId);

    if (!deletedTrip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error('Delete trip error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}