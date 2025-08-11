import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICity extends Document {
  name: string;
  country: string;
  state?: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const citySchema = new Schema<ICity>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
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

citySchema.index({ name: 1, country: 1 }, { unique: true });

const City: Model<ICity> =
  mongoose.models.City || mongoose.model<ICity>("City", citySchema);

export default City;