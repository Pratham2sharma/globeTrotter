"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Mail, Phone, Calendar, Plus, Globe, Trash2, Check } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  avatar: string;
  additionalInfo: string;
  createdAt: string;
}

interface TripCard {
  id: number;
  destination: string;
  image: string;
  duration: string;
  budget: string;
  status: string;
  rating?: number;
  year?: string;
}

export default function DynamicUserProfile() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  const { user, logout, checkAuth } = useAuthStore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [prePlannedTrips, setPrePlannedTrips] = useState<TripCard[]>([]);
  const [previousTrips, setPreviousTrips] = useState<TripCard[]>([]);
  const [loading, setLoading] = useState(true);

  const getDestinationEmoji = (destination: string) => {
    const emojiMap: { [key: string]: string } = {
      'switzerland': '🏔️', 'maldives': '🏖️', 'dubai': '🏙️', 'paris': '🇫🇷',
      'bali': '🇮🇩', 'tokyo': '🇯🇵', 'default': '🌍'
    };
    const key = destination.toLowerCase();
    return emojiMap[key] || emojiMap.default;
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchUserData();
    }
  }, [user, router, userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile by userId
      const profileResponse = await fetch(`http://localhost:5000/api/auth/profile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        console.log('Profile data:', profileData);
        setUserProfile(profileData);
      } else {
        console.error('Failed to fetch profile:', profileResponse.status);
      }

      // Fetch trips for specific user
      const tripsResponse = await fetch(`http://localhost:5000/api/trips?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (tripsResponse.ok) {
        const tripsData = await tripsResponse.json();
        const plannedTrips = tripsData.filter((trip: any) => trip.status === 'planning' || trip.status === 'booked');
        setPrePlannedTrips(plannedTrips.map((trip: any) => ({
          id: trip._id,
          destination: trip.destination,
          image: getDestinationEmoji(trip.destination),
          duration: calculateDuration(trip.startDate, trip.endDate),
          budget: `₹${trip.budget}`,
          status: trip.status === 'planning' ? 'Planning' : 'Booked'
        })));
        
        // Fetch completed trips
        const completedTrips = tripsData.filter((trip: any) => trip.status === 'completed');
        setPreviousTrips(completedTrips.map((trip: any) => ({
          id: trip._id,
          destination: trip.destination,
          image: getDestinationEmoji(trip.destination),
          duration: calculateDuration(trip.startDate, trip.endDate),
          budget: `₹${trip.budget}`,
          status: 'Completed',
          rating: 5, // Default rating
          year: new Date(trip.createdAt).getFullYear().toString()
        })));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fallback to default data if API fails
      setPrePlannedTrips([
        {
          id: 1,
          destination: "Switzerland Alps",
          image: "🏔️",
          duration: "7 days",
          budget: "₹4,50,000",
          status: "Planning",
        },
        {
          id: 2,
          destination: "Maldives",
          image: "🏖️",
          duration: "5 days",
          budget: "₹3,20,000",
          status: "Booked",
        },
        {
          id: 3,
          destination: "Dubai",
          image: "🏙️",
          duration: "4 days",
          budget: "₹2,80,000",
          status: "Planning",
        },
      ]);
      setPreviousTrips([
        {
          id: 1,
          destination: "Paris",
          image: "🇫🇷",
          duration: "6 days",
          budget: "₹3,80,000",
          status: "Completed",
          rating: 5,
          year: "2024",
        },
        {
          id: 2,
          destination: "Bali",
          image: "🇮🇩",
          duration: "8 days",
          budget: "₹2,50,000",
          status: "Completed",
          rating: 4,
          year: "2023",
        },
        {
          id: 3,
          destination: "Tokyo",
          image: "🇯🇵",
          duration: "7 days",
          budget: "₹4,20,000",
          status: "Completed",
          rating: 5,
          year: "2023",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanNewTrip = () => {
    router.push('/trip/new');
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleDeleteTrip = async (tripId: number) => {
    if (!confirm('Are you sure you want to delete this trip?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId: user?.id || 'temp-user-id' }),
      });
      
      if (response.ok) {
        // Refresh the trips data
        fetchUserData();
      } else {
        const errorData = await response.json();
        console.error('Failed to delete trip:', errorData.message);
        alert(errorData.message || 'Failed to delete trip');
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const handleCompleteTrip = async (tripId: number) => {
    if (!confirm('Mark this trip as completed?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/trips/${tripId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'completed' }),
      });
      
      if (response.ok) {
        // Refresh the trips data
        fetchUserData();
      } else {
        const errorData = await response.json();
        console.error('Failed to complete trip:', errorData.message);
        alert(errorData.message || 'Failed to complete trip');
      }
    } catch (error) {
      console.error('Error completing trip:', error);
    }
  };

  const isOwnProfile = user?.id === userId || userId === 'current';

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-900 px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">GlobeTrotter</h1>
              <p className="text-sm text-teal-300">Premium Travel Planning</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              onClick={handlePlanNewTrip}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Plan New Trip
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-4xl">
                  {user.name?.[0] || "U"}
                </span>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {user.name || "User"}
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-700">{userProfile?.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-700">{userProfile?.city && userProfile?.country ? `${userProfile.city}, ${userProfile.country}` : "Not provided"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-700">
                    Member since {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2023'}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Additional Information
                </h3>
                <p className="text-gray-600">
                  {userProfile?.additionalInfo || "Passionate traveler exploring the world one destination at a time."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Pre-planned Trips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prePlannedTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl">{trip.image}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {trip.destination}
                    </h3>
                    <p className="text-sm text-gray-600">{trip.duration}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-semibold text-slate-900">
                      {trip.budget}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        trip.status === "Booked"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => router.push(`/trip/${trip.id}`)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      trip.status === "Planning"
                        ? "bg-yellow-400 text-slate-900 hover:bg-yellow-300"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {trip.status === "Planning" ? "Edit Trip" : "View Trip"}
                  </button>
                  {isOwnProfile && (
                    <>
                      <button
                        onClick={() => handleCompleteTrip(trip.id)}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        title="Complete Trip"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        title="Delete Trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Previous Trips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl">{trip.image}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {trip.destination}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {trip.duration} • {trip.year}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-semibold text-slate-900">
                      {trip.budget}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(trip.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => router.push(`/trip/${trip.id}`)}
                  className="w-full mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  View Trip
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}