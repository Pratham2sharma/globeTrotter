import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../server/lib/db";
import User from "../../../../server/model/User";
import jwt from "jsonwebtoken";

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

    // Get user registration trends by month
    const userTrends = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 12 }
    ]);

    const trends = {
      userRegistrations: userTrends,
      popularDestinations: [
        { name: "Bali", searches: 1250 },
        { name: "Paris", searches: 980 },
        { name: "Tokyo", searches: 850 }
      ]
    };

    return NextResponse.json({ trends });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}