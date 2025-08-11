import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  fname: string;
  lname: string;
  email: string;
  phone: number;
  city: string;
  country: string;
  password: string;
  additionalInfo?: string;
  avatar: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends Model<IUser> {
  // Add any static methods here if needed
}

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Firstname is required"],
      trim: true,
    },
    lname: {
      type: String,
      required: [true, "Lastname is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    additionalInfo: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("error in hashing password", error);
  }
});

const User = (mongoose.models.User ||
  mongoose.model<IUser, UserModel>("User", userSchema)) as UserModel;

export default User;
