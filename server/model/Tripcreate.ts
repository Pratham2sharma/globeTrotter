import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITrip extends Document {
  tripName: string;
  startDate: Date;
  endDate: Date;
  description: string;
  coverPhoto?: string; // optional
  createdAt: Date;
  updatedAt: Date;
}

const tripSchema: Schema<ITrip> = new Schema(
  {
    tripName: {
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
    description: {
      type: String,
      required: true,
      trim: true,
    },
    coverPhoto: {
      type: String, // URL/path
      default: null,
    },
  },
  { timestamps: true }
);

const Trip: Model<ITrip> =
  mongoose.models.Trip || mongoose.model<ITrip>("Trip", tripSchema);

export default Trip;
