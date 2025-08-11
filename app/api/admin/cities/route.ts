import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/lib/db";
import City from "@/server/model/City";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export async function GET() {
  try {
    await connectDB();
    const cities = await City.find({ isActive: true }).sort({ name: 1 });
    return NextResponse.json({ cities });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cities" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const city = new City(body);
    await city.save();
    return NextResponse.json({ city }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create city" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
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
    const { cityId, ...updateData } = await request.json();
    
    const updatedCity = await City.findByIdAndUpdate(
      cityId,
      updateData,
      { new: true }
    );

    if (!updatedCity) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    return NextResponse.json({ city: updatedCity });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update city" }, { status: 500 });
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

    await connectDB();
    const { cityId } = await request.json();

    const deletedCity = await City.findByIdAndDelete(cityId);

    if (!deletedCity) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "City deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete city" }, { status: 500 });
  }
}