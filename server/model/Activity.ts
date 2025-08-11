import mongoose, { Schema, Document, Model } from "mongoose";

export interface IActivity extends Document {
  name: string;
  category: string;
  location: string;
  cityId: mongoose.Types.ObjectId;
  description?: string;
  price: number;
  duration: string;
  rating: number;
  imageUrl?: string;
  imageFile?: string; // Path to uploaded image file
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Adventure', 'Sightseeing', 'Culture', 'Food & Drink', 'Nature'],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    imageFile: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

activitySchema.index({ cityId: 1, category: 1 });
activitySchema.index({ name: 1 });

const Activity: Model<IActivity> =
  mongoose.models.Activity || mongoose.model<IActivity>("Activity", activitySchema);

export default Activity;