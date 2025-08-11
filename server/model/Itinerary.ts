import mongoose, { Schema, Document, Model } from "mongoose";

export interface IActivity {
  title: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  cost?: number;
}

export interface IItinerarySection {
  day: number; // e.g., Day 1, Day 2
  sectionTitle: string;
  activities: IActivity[];
  totalBudget?: number;
}

export interface IItinerary extends Document {
  tripId: mongoose.Types.ObjectId; // Link to Trip model
  sections: IItinerarySection[];
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    startTime: { type: Date },
    endTime: {
      type: Date,
      validate: {
        validator: function (this: IActivity, value: Date) {
          return !this.startTime || !value || value > this.startTime;
        },
        message: "End time must be after start time",
      },
    },
    cost: { type: Number, min: 0 },
    // Optional additions:
    // location: { type: String },
    // status: { type: String, enum: ['planned', 'completed', 'cancelled'], default: 'planned' }
  },
  { _id: false }
);

const itinerarySectionSchema = new Schema<IItinerarySection>(
  {
    day: { type: Number, required: true },
    sectionTitle: { type: String, required: true, trim: true },
    activities: { type: [activitySchema], default: [] },
    totalBudget: { type: Number, min: 0 },
  },
  { _id: false }
);

const itinerarySchema = new Schema<IItinerary>(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    sections: {
      type: [itinerarySectionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Itinerary: Model<IItinerary> =
  mongoose.models.Itinerary ||
  mongoose.model<IItinerary>("Itinerary", itinerarySchema);

export default Itinerary;
