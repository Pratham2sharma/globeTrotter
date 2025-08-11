import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITrip extends Document {
  userId: mongoose.Types.ObjectId;
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: string;
  preferences: string[];
  accommodation: string;
  transportation: string;
  activities: string[];
  status: 'planning' | 'booked' | 'completed' | 'cancelled';
  coverPhoto?: string;
  coverImageFile?: string; // Path to uploaded image file
  createdAt: Date;
  updatedAt: Date;
}

const tripSchema: Schema<ITrip> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    travelers: {
      type: Number,
      required: true,
      min: 1,
    },
    budget: {
      type: String,
      required: true,
    },
    preferences: {
      type: [String],
      default: [],
    },
    accommodation: {
      type: String,
      default: "",
    },
    transportation: {
      type: String,
      default: "",
    },
    activities: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["planning", "booked", "completed", "cancelled"],
      default: "planning",
    },
    coverPhoto: {
      type: String,
      default: null,
    },
    coverImageFile: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Trip: Model<ITrip> =
  mongoose.models.Trip || mongoose.model<ITrip>("Trip", tripSchema);

export default Trip;
