"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Plane,
  Globe,
  Save,
  ArrowLeft,
} from "lucide-react";
import { useAuthStore } from "../../../store/authStore";

interface TripData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  preferences: string[];
  accommodation: string;
  transportation: string;
  activities: string[];
}

export default function PlanTrip() {
  const router = useRouter();
  const params = useParams();
  const tripId = params.tripId as string;
  const { user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState<TripData>({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: "",
    preferences: [],
    accommodation: "",
    transportation: "",
    activities: [],
  });

  useEffect(() => {
    checkAuth();
    if (tripId !== "new") {
      fetchTripData();
    }
  }, [checkAuth, tripId]);

  const fetchTripData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTripData(data);
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  };

  const handleSaveTrip = async () => {
    setLoading(true);
    try {
      const url = tripId === "new" ? "http://localhost:5000/api/trips" : `http://localhost:5000/api/trips/${tripId}`;
      const method = tripId === "new" ? "POST" : "PUT";
      
      const payload = {
        ...tripData,
        userId: user?.id || "temp-user-id"
      };
      
      console.log("Sending trip data:", payload);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      
      if (response.ok) {
        const savedTrip = await response.json();
        console.log("Saved trip:", savedTrip);
        router.push(`/profile/${user?.id || "current"}`);
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
      }
    } catch (error) {
      console.error("Error saving trip:", error);
    } finally {
      setLoading(false);
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
    "Adventure",
    "Relaxation",
    "Culture",
    "Food",
    "Nature",
    "History",
    "Shopping",
    "Nightlife",
  ];

  const activityOptions = [
    "Sightseeing",
    "Museums",
    "Beach",
    "Hiking",
    "Photography",
    "Local Tours",
    "Water Sports",
    "City Walk",
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-900 px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="p-2 text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">GlobeTrotter</h1>
              <p className="text-sm text-teal-300">Plan Your Journey</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {tripId === "new" ? "Plan New Trip" : "Edit Trip"}
            </h2>
            <p className="text-gray-600">
              Create your perfect travel experience
            </p>
          </div>

          <div className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Destination
                </label>
                <input
                  type="text"
                  value={tripData.destination}
                  onChange={(e) =>
                    setTripData((prev) => ({
                      ...prev,
                      destination: e.target.value,
                    }))
                  }
                  placeholder="Where do you want to go?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-2" />
                  Number of Travelers
                </label>
                <input
                  type="number"
                  min="1"
                  value={tripData.travelers || 1}
                  onChange={(e) =>
                    setTripData((prev) => ({
                      ...prev,
                      travelers: parseInt(e.target.value) || 1,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Start Date
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  End Date
                </label>
                <input
                  type="date"
                  value={tripData.endDate}
                  onChange={(e) =>
                    setTripData((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                  min={tripData.startDate || new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Budget (₹)
              </label>
              <input
                type="text"
                value={tripData.budget}
                onChange={(e) =>
                  setTripData((prev) => ({ ...prev, budget: e.target.value }))
                }
                placeholder="e.g., 50,000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Accommodation & Transportation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accommodation Preference
                </label>
                <select
                  value={tripData.accommodation}
                  onChange={(e) =>
                    setTripData((prev) => ({
                      ...prev,
                      accommodation: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select accommodation</option>
                  <option value="hotel">Hotel</option>
                  <option value="resort">Resort</option>
                  <option value="apartment">Apartment</option>
                  <option value="hostel">Hostel</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Plane className="w-4 h-4 inline mr-2" />
                  Transportation
                </label>
                <select
                  value={tripData.transportation}
                  onChange={(e) =>
                    setTripData((prev) => ({
                      ...prev,
                      transportation: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select transportation</option>
                  <option value="flight">Flight</option>
                  <option value="train">Train</option>
                  <option value="bus">Bus</option>
                  <option value="car">Car Rental</option>
                  <option value="cruise">Cruise</option>
                </select>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Travel Preferences
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {preferenceOptions.map((preference) => (
                  <button
                    key={preference}
                    onClick={() => handlePreferenceToggle(preference)}
                    className={`p-3 rounded-lg border transition-colors ${
                      tripData.preferences.includes(preference)
                        ? "bg-teal-500 text-white border-teal-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-teal-300"
                    }`}
                  >
                    {preference}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Preferred Activities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {activityOptions.map((activity) => (
                  <button
                    key={activity}
                    onClick={() => handleActivityToggle(activity)}
                    className={`p-3 rounded-lg border transition-colors ${
                      tripData.activities.includes(activity)
                        ? "bg-teal-500 text-white border-teal-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-teal-300"
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <motion.button
                onClick={handleSaveTrip}
                disabled={loading || !tripData.destination || !tripData.startDate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>{loading ? "Saving..." : "Save Trip"}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}