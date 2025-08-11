import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../lib/db";
import User from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  password: string;
  additionalInfo?: string;
  avatar: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const registerUser = async (request: NextRequest): Promise<NextResponse> => {
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

    const newUser = await User.create({
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
};

export const loginUser = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email }) as IUser | null;
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: `${user.fname} ${user.lname}`,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const logoutUser = async (): Promise<NextResponse> => {
  const response = NextResponse.json({ message: "Logout successful" });
  
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });

  return response;
};

export const getCurrentUser = async (request: NextRequest): Promise<NextResponse> => {
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
    ) as any;
    
    await connectDB();
    const user = await User.findById(decoded.userId) as IUser | null;

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: `${user.fname} ${user.lname}`,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
};

export const getUserProfile = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    
    await connectDB();
    const user = await User.findById(userId) as IUser | null;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userProfile = {
      firstName: user.fname,
      lastName: user.lname,
      email: user.email,
      phone: user.phone,
      city: user.city,
      country: user.country,
      avatar: user.avatar,
      additionalInfo: user.additionalInfo || "",
      createdAt: user.createdAt,
    };

    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};