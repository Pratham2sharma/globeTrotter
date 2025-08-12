"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Mail, Phone, Calendar, Trash2, Check } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "../../../store/authStore";
import Navbar from "../../components/Navbar";

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
  preferences?: string[];
  activities?: string[];
}

export default function DynamicUserProfile() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  const { user, logout, checkAuth } = useAuthStore();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [prePlannedTrips, setPrePlannedTrips] = useState<TripCard[]>([]);
  const [previousTrips, setPreviousTrips] = useState<TripCard[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripCard | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editTrip, setEditTrip] = useState<TripCard | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    destination: '',
    budget: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    preferences: [] as string[],
    activities: [] as string[]
  });
  const [loading, setLoading] = useState(false);

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
    if (user) {
      fetchUserData();
    } else if (user === null) {
      setIsInitialized(true);
      router.push("/login");
    }
  }, [user, router, userId]);

  const fetchUserData = async () => {
    try {
      
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
      setIsInitialized(true);
    }
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

  if (!isInitialized || !user) {
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
      <Navbar />


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
                    onClick={() => {
                      if (trip.status === "Planning") {
                        setEditTrip(trip);
                        // Fetch full trip data
                        fetch(`/api/trips/${trip.id}`)
                          .then(res => res.json())
                          .then(data => {
                            setEditForm({
                              destination: data.destination || '',
                              budget: data.budget || '',
                              startDate: data.startDate?.split('T')[0] || '',
                              endDate: data.endDate?.split('T')[0] || '',
                              travelers: data.travelers || 1,
                              preferences: data.preferences || [],
                              activities: data.activities || []
                            });
                          });
                        setShowEditModal(true);
                      } else {
                        router.push(`/trip/${trip.id}`);
                      }
                    }}
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
                  onClick={() => {
                    setSelectedTrip(trip);
                    setShowModal(true);
                  }}
                  className="w-full mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trip Details Modal */}
      {showModal && selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Trip Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{selectedTrip.image}</span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedTrip.destination}</h3>
                    <p className="text-gray-600">{selectedTrip.duration} • {selectedTrip.year}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Budget</h4>
                    <p className="text-slate-900 font-medium">{selectedTrip.budget}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">Rating</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(selectedTrip.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                      <span className="ml-2 text-gray-600">({selectedTrip.rating}/5)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Trip Modal */}
      {showEditModal && editTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Edit Trip</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                    <input
                      type="text"
                      value={editForm.destination}
                      onChange={(e) => setEditForm({...editForm, destination: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                    <input
                      type="text"
                      value={editForm.budget}
                      onChange={(e) => setEditForm({...editForm, budget: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={editForm.startDate}
                      onChange={(e) => setEditForm({...editForm, startDate: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={editForm.endDate}
                      onChange={(e) => setEditForm({...editForm, endDate: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
                    <select
                      value={editForm.travelers}
                      onChange={(e) => setEditForm({...editForm, travelers: parseInt(e.target.value)})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Preferences</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['Adventure', 'Relaxation', 'Culture', 'Food', 'Nature', 'History'].map(pref => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => {
                          const newPrefs = editForm.preferences.includes(pref)
                            ? editForm.preferences.filter(p => p !== pref)
                            : [...editForm.preferences, pref];
                          setEditForm({...editForm, preferences: newPrefs});
                        }}
                        className={`p-2 text-sm rounded-lg border transition-colors ${
                          editForm.preferences.includes(pref)
                            ? 'bg-teal-100 border-teal-500 text-teal-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Activities</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['Sightseeing', 'Museums', 'Beach', 'Hiking', 'Photography', 'Local Tours'].map(activity => (
                      <button
                        key={activity}
                        type="button"
                        onClick={() => {
                          const newActivities = editForm.activities.includes(activity)
                            ? editForm.activities.filter(a => a !== activity)
                            : [...editForm.activities, activity];
                          setEditForm({...editForm, activities: newActivities});
                        }}
                        className={`p-2 text-sm rounded-lg border transition-colors ${
                          editForm.activities.includes(activity)
                            ? 'bg-blue-100 border-blue-500 text-blue-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const response = await fetch(`/api/trips/${editTrip.id}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            destination: editForm.destination,
                            budget: editForm.budget,
                            startDate: editForm.startDate,
                            endDate: editForm.endDate,
                            travelers: editForm.travelers,
                            preferences: editForm.preferences,
                            activities: editForm.activities,
                            isInternational: !["india", "mumbai", "delhi", "chandigarh", "noida", "gurgaon", "bangalore", "chennai", "kolkata", "hyderabad", "pune", "ahmedabad", "jaipur", "goa", "kerala", "rajasthan", "kashmir", "himachal", "uttarakhand", "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh", "gujarat", "haryana", "jharkhand", "karnataka", "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "odisha", "punjab", "sikkim", "tamil nadu", "telangana", "tripura", "uttar pradesh", "west bengal", "andaman", "dadra", "daman", "lakshadweep", "puducherry", "agra", "allahabad", "amritsar", "aurangabad", "bhopal", "bhubaneswar", "coimbatore", "dehradun", "faridabad", "ghaziabad", "guwahati", "hubli", "indore", "jabalpur", "jammu", "jodhpur", "kanpur", "kochi", "lucknow", "ludhiana", "madurai", "mangalore", "meerut", "mysore", "nagpur", "nashik", "patna", "raipur", "rajkot", "ranchi", "salem", "shimla", "srinagar", "surat", "thiruvananthapuram", "tiruchirappalli", "udaipur", "vadodara", "varanasi", "vijayawada", "visakhapatnam", "rishikesh", "haridwar", "manali", "dharamshala", "ooty", "kodaikanal", "munnar", "alleppey", "varkala", "hampi", "pushkar", "mount abu", "darjeeling", "gangtok", "shillong", "imphal", "kohima", "aizawl"].some(place => editForm.destination.toLowerCase().includes(place))
                          })
                        });
                        if (response.ok) {
                          setShowEditModal(false);
                          fetchUserData();
                          alert('Trip updated successfully!');
                        } else {
                          alert('Failed to update trip');
                        }
                      } catch (error) {
                        console.error('Error updating trip:', error);
                        alert('Error updating trip');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}