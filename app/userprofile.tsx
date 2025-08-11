"use client"

import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Users, Plus, Globe, Star, Clock, ArrowRight, Plane, Camera, Coffee } from 'lucide-react';

// Type definitions
interface Trip {
  id: number;
  destination: string;
  cities: string[];
  dates: string;
  budget: string;
  status: 'Planning' | 'Booked' | 'Completed';
  progress: number;
  image: string;
}

interface Destination {
  name: string;
  country: string;
  rating: number;
  trips: number;
  image: string;
}

interface Activity {
  action: string;
  location: string;
  time: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface TravelStats {
  tripsPlanned: number;
  citiesVisited: number;
  totalBudget: string;
}

type TabType = 'upcoming' | 'past' | 'shared';

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  const upcomingTrips: Trip[] = [
    {
      id: 1,
      destination: 'European Grand Tour',
      cities: ['Paris', 'Rome', 'Barcelona'],
      dates: 'Dec 15 - 28, 2025',
      budget: '₹3,50,000',
      status: 'Planning',
      progress: 75,
      image: '🇫🇷'
    },
    {
      id: 2,
      destination: 'Japan Adventure',
      cities: ['Tokyo', 'Kyoto', 'Osaka'],
      dates: 'Mar 8 - 22, 2026',
      budget: '₹3,15,000',
      status: 'Booked',
      progress: 100,
      image: '🇯🇵'
    }
  ];

  const pastTrips: Trip[] = [
    {
      id: 3,
      destination: 'Thailand Explorer',
      cities: ['Bangkok', 'Phuket', 'Chiang Mai'],
      dates: 'Jan 10 - 24, 2024',
      budget: '₹2,33,000',
      status: 'Completed',
      progress: 100,
      image: '🇹🇭'
    },
    {
      id: 4,
      destination: 'Iceland Adventure',
      cities: ['Reykjavik', 'Blue Lagoon'],
      dates: 'Sep 5 - 12, 2023',
      budget: '₹2,66,000',
      status: 'Completed',
      progress: 100,
      image: '🇮🇸'
    }
  ];

  const sharedTrips: Trip[] = [
    {
      id: 5,
      destination: 'Bali Group Trip',
      cities: ['Ubud', 'Seminyak', 'Canggu'],
      dates: 'Aug 15 - 29, 2025',
      budget: '₹2,00,000',
      status: 'Planning',
      progress: 60,
      image: '🇮🇩'
    },
    {
      id: 6,
      destination: 'Morocco with Friends',
      cities: ['Marrakech', 'Fez', 'Casablanca'],
      dates: 'Nov 3 - 17, 2025',
      budget: '₹2,58,000',
      status: 'Booked',
      progress: 90,
      image: '🇲🇦'
    }
  ];

  const popularDestinations: Destination[] = [
    { name: 'Santorini', country: 'Greece', rating: 4.9, trips: 1245, image: '🏝️' },
    { name: 'Bali', country: 'Indonesia', rating: 4.8, trips: 2341, image: '🌺' },
    { name: 'Dubai', country: 'UAE', rating: 4.7, trips: 1876, image: '🏙️' },
    { name: 'Maldives', country: 'Maldives', rating: 4.9, trips: 987, image: '🏖️' },
    { name: 'Swiss Alps', country: 'Switzerland', rating: 4.8, trips: 1432, image: '🏔️' },
    { name: 'Tuscany', country: 'Italy', rating: 4.7, trips: 1654, image: '🍷' }
  ];

  const recentActivities: Activity[] = [
    { action: 'Added new stop', location: 'Venice', time: '2 hours ago', icon: MapPin },
    { action: 'Updated budget', location: 'European Trip', time: '5 hours ago', icon: DollarSign },
    { action: 'Shared itinerary', location: 'Japan Adventure', time: '1 day ago', icon: Users }
  ];

  const travelStats: TravelStats = {
    tripsPlanned: 12,
    citiesVisited: 28,
    totalBudget: '₹20,50,000'
  };

  const getStatusColor = (status: Trip['status']): string => {
    switch (status) {
      case 'Booked':
        return 'bg-green-100 text-green-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
  };

  const handlePlanNewTrip = (): void => {
    console.log('Navigate to new trip planning');
  };

  const handleTripClick = (tripId: number): void => {
    console.log(`Navigate to trip ${tripId}`);
  };

  const handleDestinationClick = (destination: string): void => {
    console.log(`Navigate to ${destination}`);
  };

  const getCurrentTrips = (): Trip[] => {
    switch (activeTab) {
      case 'past':
        return pastTrips;
      case 'shared':
        return sharedTrips;
      default:
        return upcomingTrips;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      {/* Header */}
      <header className="bg-slate-900 px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">GlobeTrotter</h1>
              <p className="text-xs sm:text-sm text-teal-300 hidden sm:block">Premium Travel Planning</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              className="px-3 py-2 sm:px-6 sm:py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:bg-yellow-300 transform hover:-translate-y-0.5 text-sm sm:text-base"
              onClick={handlePlanNewTrip}
              type="button"
            >
              <Plus className="w-4 h-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Plan New Trip</span>
              <span className="sm:hidden">Plan</span>
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white font-semibold text-sm sm:text-base">JD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900">
            Welcome back, John! ✈️
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Ready to plan your next extraordinary journey?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Trip Overview Cards */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Your Trips</h3>
                <div className="flex space-x-1 sm:space-x-2 overflow-x-auto">
                  {(['upcoming', 'past', 'shared'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
                        activeTab === tab 
                          ? 'bg-slate-900 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      type="button"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {getCurrentTrips().map((trip: Trip) => (
                  <div 
                    key={trip.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => handleTripClick(trip.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleTripClick(trip.id);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-3 mb-3">
                          <span className="text-2xl sm:text-3xl" role="img" aria-label="Flag">{trip.image}</span>
                          <div className="flex-1">
                            <h4 className="text-base sm:text-lg font-bold text-slate-900">
                              {trip.destination}
                            </h4>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 gap-1 sm:gap-0">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span className="truncate">{trip.dates}</span>
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {trip.cities.length} cities
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-4 gap-2 sm:gap-0">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-teal-400" />
                            <span className="font-semibold text-gray-600">
                              {trip.budget}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                              {trip.status}
                            </div>
                            {activeTab === 'shared' && (
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3 text-blue-500" />
                                <span className="text-xs text-blue-600">Shared</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {activeTab !== 'past' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Planning Progress</span>
                              <span className="font-medium text-slate-900">
                                {trip.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-teal-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${trip.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {activeTab === 'past' && (
                          <div className="flex items-center space-x-2 text-sm text-green-600">
                            <Clock className="w-4 h-4" />
                            <span>Trip completed</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg hover:bg-gray-100" type="button">
                          <ArrowRight className="w-5 h-5 text-teal-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Destinations */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-slate-900">
                Trending Destinations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {popularDestinations.map((dest: Destination, index: number) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => handleDestinationClick(dest.name)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleDestinationClick(dest.name);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <span className="text-xl sm:text-2xl" role="img" aria-label="Destination">{dest.image}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                          {dest.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {dest.country}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 fill-current text-yellow-400" />
                            <span className="text-xs ml-1 text-gray-600">
                              {dest.rating}
                            </span>
                          </div>
                          <span className="text-xs text-gray-600 truncate">
                            {dest.trips.toLocaleString()} trips
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4 lg:space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h4 className="font-bold mb-3 sm:mb-4 text-slate-900 text-base sm:text-lg">
                Your Travel Stats
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-teal-400" />
                    <span className="text-sm text-gray-600">Trips Planned</span>
                  </div>
                  <span className="font-bold text-slate-900">{travelStats.tripsPlanned}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-teal-400" />
                    <span className="text-sm text-gray-600">Cities Visited</span>
                  </div>
                  <span className="font-bold text-slate-900">{travelStats.citiesVisited}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-teal-400" />
                    <span className="text-sm text-gray-600">Total Budget</span>
                  </div>
                  <span className="font-bold text-slate-900">{travelStats.totalBudget}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h4 className="font-bold mb-3 sm:mb-4 text-slate-900 text-base sm:text-lg">
                Recent Activity
              </h4>
              <div className="space-y-3">
                {recentActivities.map((activity: Activity, index: number) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-teal-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-600">
                          {activity.location} • {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <h4 className="font-bold mb-3 sm:mb-4 text-slate-900 text-base sm:text-lg">
                Quick Actions
              </h4>
              <div className="space-y-2">
                <button 
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  type="button"
                >
                  <Camera className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-gray-600">Browse Inspiration</span>
                </button>
                <button 
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  type="button"
                >
                  <Coffee className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-gray-600">Find Activities</span>
                </button>
                <button 
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  type="button"
                >
                  <Users className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-gray-600">Invite Friends</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;