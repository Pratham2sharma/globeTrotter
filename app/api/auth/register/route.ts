import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../server/lib/db";
import User from "../../../../server/model/User";

export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      country,
      password,
      additionalInfo,
    } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "First name, last name, email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    await User.create({
      fname: firstName,
      lname: lastName,
      email,
      phone: phone || "",
      city: city || "",
      country: country || "",
      password,
      additionalInfo: additionalInfo || "",
      avatar: "",
      role: "user",
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}