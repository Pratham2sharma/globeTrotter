"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  DollarSign,
  Save,
  Users,
  Sparkles,
  Plane,
  Heart,
} from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import AIBudgetSuggestion from "../../components/AIBudgetSuggestion";
import Navbar from "../../components/Navbar";

interface TripData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  preferences: string[];
  activities: string[];
  isInternational: boolean;
  travelers: number;
}

export default function TripPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const tripId = params.tripId as string;
  const { user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [savedTripId, setSavedTripId] = useState<string | null>(null);
  const [tripData, setTripData] = useState<TripData>({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "", 
    preferences: [],
    activities: [],
    isInternational: false,
    travelers: 1,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const domesticBudgetRanges = [
    "₹10,000 - ₹25,000",
    "₹25,000 - ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹2,00,000",
    "₹2,00,000+",
  ];

  const internationalBudgetRanges = [
    "₹1,00,000 - ₹2,50,000",
    "₹2,50,000 - ₹5,00,000",
    "₹5,00,000 - ₹10,00,000",
    "₹10,00,000 - ₹20,00,000",
    "₹20,00,000+",
  ];

  const budgetRanges = tripData.isInternational
    ? internationalBudgetRanges
    : domesticBudgetRanges;

  const fetchTripData = useCallback(async () => {
    try {
      const response = await fetch(`/api/trips/${tripId}`);
      if (response.ok) {
        const data = await response.json();
        setTripData({
          destination: data.destination || "",
          startDate: data.startDate?.split("T")[0] || "",
          endDate: data.endDate?.split("T")[0] || "",
          budget: data.budget || "",
          preferences: data.preferences || [],
          activities: data.activities || [],
          isInternational: data.isInternational || false,
          travelers: data.travelers || 1,
        });
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  }, [tripId]);

  useEffect(() => {
    checkAuth();
    if (tripId !== "new") {
      fetchTripData();
      setSavedTripId(tripId);
    } else {
      // Pre-fill destination from URL parameter
      const destination = searchParams.get('destination');
      if (destination) {
        const dest = decodeURIComponent(destination);
        setTripData(prev => ({
          ...prev,
          destination: dest,
          isInternational: ![
            "india", "mumbai", "delhi", "chandigarh", "noida", "gurgaon", "bangalore", "chennai", "kolkata", "hyderabad", "pune", "ahmedabad", "jaipur", "goa", "kerala", "rajasthan", "kashmir", "himachal", "uttarakhand", "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh", "gujarat", "haryana", "jharkhand", "karnataka", "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "odisha", "punjab", "sikkim", "tamil nadu", "telangana", "tripura", "uttar pradesh", "west bengal", "andaman", "dadra", "daman", "lakshadweep", "puducherry", "agra", "allahabad", "amritsar", "aurangabad", "bhopal", "bhubaneswar", "coimbatore", "dehradun", "faridabad", "ghaziabad", "guwahati", "hubli", "indore", "jabalpur", "jammu", "jodhpur", "kanpur", "kochi", "lucknow", "ludhiana", "madurai", "mangalore", "meerut", "mysore", "nagpur", "nashik", "patna", "raipur", "rajkot", "ranchi", "salem", "shimla", "srinagar", "surat", "thiruvananthapuram", "tiruchirappalli", "udaipur", "vadodara", "varanasi", "vijayawada", "visakhapatnam", "rishikesh", "haridwar", "manali", "dharamshala", "ooty", "kodaikanal", "munnar", "alleppey", "varkala", "hampi", "pushkar", "mount abu", "darjeeling", "gangtok", "shillong", "imphal", "kohima", "aizawl"
          ].some(place => dest.toLowerCase().includes(place))
        }));
      }
    }
  }, [checkAuth, tripId, fetchTripData, searchParams]);

  const validateDates = () => {
    if (!tripData.startDate || !tripData.endDate) return false;

    const start = new Date(tripData.startDate);
    const end = new Date(tripData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (tripData.isInternational) {
      return diffDays <= 60; // Max 2 months for international
    } else {
      return diffDays <= 14; // Max 2 weeks for domestic
    }
  };

  const getDurationError = () => {
    if (!tripData.startDate || !tripData.endDate) return "";

    const start = new Date(tripData.startDate);
    const end = new Date(tripData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (tripData.isInternational && diffDays > 60) {
      return "International trips are limited to 2 months maximum";
    } else if (!tripData.isInternational && diffDays > 14) {
      return "Domestic trips are limited to 2 weeks maximum";
    }
    return "";
  };

  const handleCreateTrip = async () => {
    if (
      !tripData.destination ||
      !tripData.startDate ||
      !tripData.endDate ||
      !tripData.budget ||
      !validateDates()
    ) {
      alert("Please fill in all required fields and check date limits");
      return;
    }

    setLoading(true);
    setIsAnimating(true);
    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user?.id || 'anonymous-user',
        },
        body: JSON.stringify(tripData),
      });

      if (response.ok) {
        const savedTrip = await response.json();
        setSavedTripId(savedTrip._id);
      } else {
        alert("Failed to create trip");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Failed to create trip");
    } finally {
      setLoading(false);
      setIsAnimating(false);
    }
  };

  const handleUpdateTrip = async () => {
    if (
      !tripData.destination ||
      !tripData.startDate ||
      !tripData.endDate ||
      !tripData.budget ||
      !validateDates()
    ) {
      alert("Please fill in all required fields and check date limits");
      return;
    }

    setLoading(true);
    setIsAnimating(true);
    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      if (response.ok) {
        alert("Trip updated successfully!");
        router.push(`/profile/${user?.id}`);
      } else {
        alert("Failed to update trip");
      }
    } catch (error) {
      console.error("Error updating trip:", error);
      alert("Failed to update trip");
    } finally {
      setLoading(false);
      setIsAnimating(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreferenceToggle = (preference: string) => {
    setTripData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  const handleActivityToggle = (activity: string) => {
    setTripData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const preferenceOptions = [
    { name: "Adventure", icon: "🏔️", color: "bg-orange-100 text-orange-800" },
    { name: "Relaxation", icon: "🧘", color: "bg-blue-100 text-blue-800" },
    { name: "Culture", icon: "🏛️", color: "bg-purple-100 text-purple-800" },
    { name: "Food", icon: "🍜", color: "bg-red-100 text-red-800" },
    { name: "Nature", icon: "🌿", color: "bg-green-100 text-green-800" },
    { name: "History", icon: "📚", color: "bg-yellow-100 text-yellow-800" },
  ];

  const activityOptions = [
    { name: "Sightseeing", icon: "👁️", color: "bg-teal-100 text-teal-800" },
    { name: "Museums", icon: "🏛️", color: "bg-indigo-100 text-indigo-800" },
    { name: "Beach", icon: "🏖️", color: "bg-cyan-100 text-cyan-800" },
    { name: "Hiking", icon: "🥾", color: "bg-emerald-100 text-emerald-800" },
    { name: "Photography", icon: "📸", color: "bg-pink-100 text-pink-800" },
    { name: "Local Tours", icon: "🚌", color: "bg-amber-100 text-amber-800" },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Navbar />


      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 md:p-12"
        >
          <div className="mb-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <Plane className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
              {tripId === "new" ? "Plan Your Dream Trip" : "Edit Trip"}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {tripId === "new"
                ? "Let our AI create the perfect itinerary tailored just for you. Every journey begins with a single step."
                : "Update your trip details and preferences"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                    Basic Information
                  </h3>
                  <p className="text-gray-600">
                    Tell us about your dream destination
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="space-y-3"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <MapPin className="w-5 h-5 inline mr-2 text-teal-600" />
                      Destination *
                    </label>
                    <input
                      type="text"
                      value={tripData.destination}
                      onChange={(e) => {
                        const dest = e.target.value;
                        setTripData((prev) => ({
                          ...prev,
                          destination: dest,
                          isInternational: ![
                            "india", "mumbai", "delhi", "chandigarh", "noida", "gurgaon", "bangalore", "chennai", "kolkata", "hyderabad", "pune", "ahmedabad", "jaipur", "goa", "kerala", "rajasthan", "kashmir", "himachal", "uttarakhand", "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh", "gujarat", "haryana", "jharkhand", "karnataka", "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "odisha", "punjab", "sikkim", "tamil nadu", "telangana", "tripura", "uttar pradesh", "west bengal", "andaman", "dadra", "daman", "lakshadweep", "puducherry", "agra", "allahabad", "amritsar", "aurangabad", "bhopal", "bhubaneswar", "coimbatore", "dehradun", "faridabad", "ghaziabad", "guwahati", "hubli", "indore", "jabalpur", "jammu", "jodhpur", "kanpur", "kochi", "lucknow", "ludhiana", "madurai", "mangalore", "meerut", "mysore", "nagpur", "nashik", "patna", "raipur", "rajkot", "ranchi", "salem", "shimla", "srinagar", "surat", "thiruvananthapuram", "tiruchirappalli", "udaipur", "vadodara", "varanasi", "vijayawada", "visakhapatnam", "rishikesh", "haridwar", "manali", "dharamshala", "ooty", "kodaikanal", "munnar", "alleppey", "varkala", "hampi", "pushkar", "mount abu", "darjeeling", "gangtok", "shillong", "imphal", "kohima", "aizawl"
                          ].some((place) => dest.toLowerCase().includes(place)),
                        }));
                      }}
                      placeholder="e.g., Paris, Tokyo, Goa, Mumbai..."
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-lg"
                      required
                    />
                    {tripData.destination && (
                      <div
                        className={`text-sm p-2 rounded-lg ${
                          tripData.isInternational
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {tripData.isInternational
                          ? "🌍 International Trip (Max 2 months)"
                          : "🇮🇳 Domestic Trip (Max 2 weeks)"}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="space-y-3"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Users className="w-5 h-5 inline mr-2 text-teal-600" />
                      Number of Travelers *
                    </label>
                    <select
                      value={tripData.travelers}
                      onChange={(e) =>
                        setTripData((prev) => ({
                          ...prev,
                          travelers: parseInt(e.target.value),
                        }))
                      }
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-lg"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Traveler" : "Travelers"}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="space-y-3"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Calendar className="w-5 h-5 inline mr-2 text-teal-600" />
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={tripData.startDate}
                      onChange={(e) =>
                        setTripData((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-lg"
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="space-y-3"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Calendar className="w-5 h-5 inline mr-2 text-teal-600" />
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={tripData.endDate}
                      onChange={(e) =>
                        setTripData((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      min={
                        tripData.startDate ||
                        new Date().toISOString().split("T")[0]
                      }
                      max={
                        tripData.startDate
                          ? new Date(
                              new Date(tripData.startDate).getTime() +
                                (tripData.isInternational ? 60 : 14) *
                                  24 *
                                  60 *
                                  60 *
                                  1000
                            )
                              .toISOString()
                              .split("T")[0]
                          : undefined
                      }
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-lg"
                      required
                    />
                    {getDurationError() && (
                      <div className="text-red-600 text-sm bg-red-50 p-2 rounded-lg">
                        {getDurationError()}
                      </div>
                    )}
                  </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <DollarSign className="w-5 h-5 inline mr-2 text-teal-600" />
                    Budget Range *
                  </label>
                  <select
                    value={tripData.budget}
                    onChange={(e) =>
                      setTripData((prev) => ({
                        ...prev,
                        budget: e.target.value,
                      }))
                    }
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 text-lg"
                    required
                  >
                    <option value="">Select your budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    💡{" "}
                    {tripData.isInternational
                      ? "International trips include flights, accommodation, and activities"
                      : "Domestic trips include transport, stay, and local experiences"}
                  </div>
                </motion.div>

                <div className="flex justify-end pt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    disabled={
                      !tripData.destination ||
                      !tripData.startDate ||
                      !tripData.endDate ||
                      !tripData.budget ||
                      !validateDates()
                    }
                    className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Next Step
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                    Travel Preferences
                  </h3>
                  <p className="text-gray-600">
                    What kind of experience are you looking for?
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      What interests you most?
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {preferenceOptions.map((preference) => (
                        <motion.button
                          key={preference.name}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            handlePreferenceToggle(preference.name)
                          }
                          className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                            tripData.preferences.includes(preference.name)
                              ? "border-teal-500 bg-gradient-to-br from-teal-50 to-blue-50 text-teal-700 shadow-lg"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-md bg-white"
                          }`}
                        >
                          <span className="text-2xl">{preference.icon}</span>
                          <span className="font-medium">{preference.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      Preferred Activities
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {activityOptions.map((activity) => (
                        <motion.button
                          key={activity.name}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleActivityToggle(activity.name)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                            tripData.activities.includes(activity.name)
                              ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-700 shadow-lg"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-md bg-white"
                          }`}
                        >
                          <span className="text-2xl">{activity.icon}</span>
                          <span className="font-medium">{activity.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  >
                    ← Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextStep}
                    className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                  >
                    Next Step
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                    Review & {tripId === "new" ? "Create" : "Update"}
                  </h3>
                  <p className="text-gray-600">
                    {tripId === "new" ? "Let's create your perfect itinerary!" : "Review your changes and update the trip"}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 space-y-4">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">
                    Trip Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-teal-600" />
                      <span className="font-medium">Destination:</span>{" "}
                      {tripData.destination}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-600" />
                      <span className="font-medium">Travelers:</span>{" "}
                      {tripData.travelers}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span className="font-medium">Dates:</span>{" "}
                      {tripData.startDate} to {tripData.endDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-teal-600" />
                      <span className="font-medium">Budget:</span>{" "}
                      {tripData.budget}
                    </div>
                  </div>
                  {tripData.preferences.length > 0 && (
                    <div>
                      <span className="font-medium text-slate-700">
                        Preferences:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tripData.preferences.map((pref) => (
                          <span
                            key={pref}
                            className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {tripData.activities.length > 0 && (
                    <div>
                      <span className="font-medium text-slate-700">
                        Activities:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tripData.activities.map((activity) => (
                          <span
                            key={activity}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  >
                    ← Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: savedTripId && tripId === "new" ? 1 : 1.05 }}
                    whileTap={{ scale: savedTripId && tripId === "new" ? 1 : 0.95 }}
                    onClick={tripId === "new" ? handleCreateTrip : handleUpdateTrip}
                    disabled={loading || !validateDates() || (tripId === "new" && savedTripId !== null)}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {savedTripId && tripId === "new" ? (
                      <>
                        <Save className="w-5 h-5" />
                        Trip Created ✓
                      </>
                    ) : loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        {tripId === "new" ? "Creating Trip..." : "Updating Trip..."}
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {tripId === "new" ? "Create My Trip" : "Update Trip"}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Suggestions */}
          {savedTripId && tripId === "new" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12"
            >
              <div className="text-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  AI-Powered Itinerary
                </h3>
                <p className="text-gray-600">
                  Your personalized travel plan is being generated...
                </p>
              </div>
              <AIBudgetSuggestion tripId={savedTripId} />
              
              {/* Go to Profile Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/profile')}
                  className="px-8 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  <Users className="w-5 h-5" />
                  Go to Profile
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 text-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Globe className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {tripId === "new" ? "Creating Your Dream Trip" : "Updating Your Trip"}
              </h3>
              <p className="text-gray-600">
                {tripId === "new" ? "Our AI is crafting the perfect itinerary for you..." : "Saving your changes..."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}