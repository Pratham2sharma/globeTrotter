import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAIBudgetSuggestion extends Document {
  userId: string;
  tripId: mongoose.Types.ObjectId;
  destination: string;
  totalBudget: number;
  budgetBreakdown: {
    accommodation: { amount: number; percentage: number; tips: string[] };
    food: { amount: number; percentage: number; tips: string[] };
    transportation: { amount: number; percentage: number; tips: string[] };
    activities: { amount: number; percentage: number; tips: string[] };
    miscellaneous: { amount: number; percentage: number; tips: string[] };
  };
  itinerarySuggestions: {
    day: number;
    date?: string;
    dayOfWeek?: string;
    locations: string[];
    activities: string[];
    estimatedCost: number;
    weatherTips?: string[];
    description?: string;
  }[];
  localTips: string[];
  seasonalInfo?: {
    season: string;
    weather: string;
    festivals: string[];
    recommendedActivities: string[];
    tips: string[];
  };
  tripDuration?: string;
  createdAt: Date;
  updatedAt: Date;
}

const aiBudgetSuggestionSchema = new Schema<IAIBudgetSuggestion>(
  {
    userId: { type: String, required: true },
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    destination: { type: String, required: true },
    totalBudget: { type: Number, required: true },
    budgetBreakdown: {
      accommodation: {
        amount: Number,
        percentage: Number,
        tips: [String]
      },
      food: {
        amount: Number,
        percentage: Number,
        tips: [String]
      },
      transportation: {
        amount: Number,
        percentage: Number,
        tips: [String]
      },
      activities: {
        amount: Number,
        percentage: Number,
        tips: [String]
      },
      miscellaneous: {
        amount: Number,
        percentage: Number,
        tips: [String]
      }
    },
    itinerarySuggestions: [{
      day: Number,
      date: String,
      dayOfWeek: String,
      locations: [String],
      activities: [String],
      estimatedCost: Number,
      weatherTips: [String],
      description: String
    }],
    localTips: [String],
    seasonalInfo: {
      season: String,
      weather: String,
      festivals: [String],
      recommendedActivities: [String],
      tips: [String]
    },
    tripDuration: String
  },
  { timestamps: true }
);

const AIBudgetSuggestion: Model<IAIBudgetSuggestion> =
  mongoose.models.AIBudgetSuggestion ||
  mongoose.model<IAIBudgetSuggestion>("AIBudgetSuggestion", aiBudgetSuggestionSchema);

export default AIBudgetSuggestion;