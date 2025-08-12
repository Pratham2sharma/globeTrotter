import { AIService } from "../services/aiService";
import AIBudgetSuggestion from "../model/AIBudgetSuggestion";
import Trip from "../model/Tripcreate";
import { connectDB } from "../lib/db";

const aiService = new AIService();

export const generateBudgetSuggestion = async (tripId: string) => {
  try {
    await connectDB();

    const trip = await Trip.findById(tripId);
    if (!trip) {
      throw new Error("Trip not found");
    }

    // Check if suggestion already exists
    const existingSuggestion = await AIBudgetSuggestion.findOne({ tripId });
    if (existingSuggestion) {
      return existingSuggestion;
    }

    const days = Math.ceil(
      (trip.endDate.getTime() - trip.startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const startDate = trip.startDate.toISOString().split("T")[0];

    // Determine if trip is international
    const isInternational = ![
      "india",
      "mumbai",
      "delhi",
      "chandigarh",
      "noida",
      "gurgaon",
      "bangalore",
      "chennai",
      "kolkata",
      "hyderabad",
      "pune",
      "ahmedabad",
      "jaipur",
      "goa",
      "kerala",
      "rajasthan",
      "kashmir",
      "himachal",
      "uttarakhand",
      "andhra pradesh",
      "arunachal pradesh",
      "assam",
      "bihar",
      "chhattisgarh",
      "gujarat",
      "haryana",
      "jharkhand",
      "karnataka",
      "madhya pradesh",
      "maharashtra",
      "manipur",
      "meghalaya",
      "mizoram",
      "nagaland",
      "odisha",
      "punjab",
      "sikkim",
      "tamil nadu",
      "telangana",
      "tripura",
      "uttar pradesh",
      "west bengal",
      "andaman",
      "chandigarh",
      "dadra",
      "daman",
      "lakshadweep",
      "puducherry",
      "agra",
      "allahabad",
      "amritsar",
      "aurangabad",
      "bhopal",
      "bhubaneswar",
      "chandigarh",
      "coimbatore",
      "dehradun",
      "faridabad",
      "ghaziabad",
      "gurgaon",
      "guwahati",
      "hubli",
      "indore",
      "jabalpur",
      "jammu",
      "jodhpur",
      "kanpur",
      "kochi",
      "lucknow",
      "ludhiana",
      "madurai",
      "mangalore",
      "meerut",
      "mysore",
      "nagpur",
      "nashik",
      "noida",
      "patna",
      "raipur",
      "rajkot",
      "ranchi",
      "salem",
      "shimla",
      "srinagar",
      "surat",
      "thiruvananthapuram",
      "tiruchirappalli",
      "udaipur",
      "vadodara",
      "varanasi",
      "vijayawada",
      "visakhapatnam",
      "rishikesh",
      "haridwar",
      "manali",
      "dharamshala",
      "ooty",
      "kodaikanal",
      "munnar",
      "alleppey",
      "varkala",
      "hampi",
      "pushkar",
      "mount abu",
      "darjeeling",
      "gangtok",
      "shillong",
      "imphal",
      "kohima",
      "aizawl",
    ].some((place) => trip.destination.toLowerCase().includes(place));

    const suggestion = await aiService.generateBudgetSuggestions(
      trip.destination,
      trip.budget,
      trip.travelers,
      days,
      trip.preferences,
      startDate,
      isInternational
    );

    const savedSuggestion = await AIBudgetSuggestion.create({
      userId: trip.userId.toString(),
      tripId,
      destination: trip.destination,
      totalBudget: suggestion.totalBudget,
      budgetBreakdown: suggestion.breakdown,
      itinerarySuggestions: suggestion.itinerarySuggestions,
      localTips: suggestion.localTips,
      seasonalInfo: suggestion.seasonalInfo,
      tripDuration: suggestion.tripDuration,
    });

    return savedSuggestion;
  } catch (error) {
    console.error("AI suggestion error:", error);
    throw error;
  }
};
