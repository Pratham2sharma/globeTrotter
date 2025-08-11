import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../server/lib/db";
import User from "../../../../server/model/User";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as JWTPayload;

    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied. Admin role required." },
        { status: 403 }
      );
    }

    await connectDB();

    const totalUsers = await User.countDocuments();
    
    // Mock data for other entities - replace with actual counts when models are available
    const stats = {
      totalUsers,
      activeTrips: 2, // Mock count
      activities: 3,  // Mock count
      cities: 3       // Mock count
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}