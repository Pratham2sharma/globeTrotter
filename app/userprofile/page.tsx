"use client"

import React from 'react';
import { MapPin, Mail, Phone, Calendar, Plus, Globe } from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  avatar: string;
  additionalInfo: string;
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

export default function UserProfile() {
  // User profile data
  const userProfile: UserProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    country: 'India',
    avatar: 'JD',
    additionalInfo: 'Passionate traveler exploring the world one destination at a time. Love adventure and cultural experiences.'
  };

  // Pre-planned trips data
  const prePlannedTrips: TripCard[] = [
    {
      id: 1,
      destination: 'Switzerland Alps',
      image: '🏔️',
      duration: '7 days',
      budget: '₹4,50,000',
      status: 'Planning'
    },
    {
      id: 2,
      destination: 'Maldives',
      image: '🏖️',
      duration: '5 days',
      budget: '₹3,20,000',
      status: 'Booked'
    },
    {
      id: 3,
      destination: 'Dubai',
      image: '🏙️',
      duration: '4 days',
      budget: '₹2,80,000',
      status: 'Planning'
    }
  ];

  // Previous trips data
  const previousTrips: TripCard[] = [
    {
      id: 1,
      destination: 'Paris',
      image: '🇫🇷',
      duration: '6 days',
      budget: '₹3,80,000',
      status: 'Completed',
      rating: 5,
      year: '2024'
    },
    {
      id: 2,
      destination: 'Bali',
      image: '🇮🇩',
      duration: '8 days',
      budget: '₹2,50,000',
      status: 'Completed',
      rating: 4,
      year: '2023'
    },
    {
      id: 3,
      destination: 'Tokyo',
      image: '🇯🇵',
      duration: '7 days',
      budget: '₹4,20,000',
      status: 'Completed',
      rating: 5,
      year: '2023'
    }
  ];
  const handlePlanNewTrip = () => {
    window.location.href = '/plan-trip';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          
          <div className="flex gap-3">
            <button 
              className="px-6 py-2 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-colors"
              onClick={() => window.location.href = '/my-trips'}
            >
              View All Trips
            </button>
            <button 
              className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              onClick={handlePlanNewTrip}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Plan New Trip
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* User Profile Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-4xl">{userProfile.avatar}</span>
            </div>
            
            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {userProfile.firstName} {userProfile.lastName}
                </h1>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-700">{userProfile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-700">{userProfile.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-700">{userProfile.city}, {userProfile.country}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-700">Member since Jan 2023</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-slate-900 mb-2">Additional Information</h3>
                <p className="text-gray-600">{userProfile.additionalInfo}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pre-planned Trips Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pre-planned Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prePlannedTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl">{trip.image}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">{trip.destination}</h3>
                    <p className="text-sm text-gray-600">{trip.duration}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-semibold text-slate-900">{trip.budget}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'Booked' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                </div>
                <button 
                  className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                    trip.status === 'Planning' 
                      ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-300' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {trip.status === 'Planning' ? 'Create Trip' : 'View Trip'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Trips Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Previous Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl">{trip.image}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">{trip.destination}</h3>
                    <p className="text-sm text-gray-600">{trip.duration} • {trip.year}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-semibold text-slate-900">{trip.budget}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(trip.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
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