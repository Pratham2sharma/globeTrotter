import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/lib/db";
import Activity from "@/server/model/Activity";
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
    const activities = await Activity.find({}).sort({ name: 1 });
    return NextResponse.json({ activities: activities || [] });
  } catch (error) {
    console.error('Activities API Error:', error);
    return NextResponse.json({ activities: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const activity = new Activity(body);
    await activity.save();
    return NextResponse.json({ activity }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 });
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
    const { activityId, ...updateData } = await request.json();
    
    console.log('Updating activity:', activityId, 'with data:', updateData);
    
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      updateData,
      { new: true }
    );

    if (!updatedActivity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 });
    }

    return NextResponse.json({ activity: updatedActivity });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: "Failed to update activity" }, { status: 500 });
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
    const { activityId } = await request.json();

    const deletedActivity = await Activity.findByIdAndDelete(activityId);

    if (!deletedActivity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: "Failed to delete activity" }, { status: 500 });
  }
}