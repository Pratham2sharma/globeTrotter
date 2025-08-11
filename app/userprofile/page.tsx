"use client"

// React imports for component functionality
import React, { useState } from 'react';
// Lucide React icons for consistent UI iconography
import { Calendar, MapPin, Users, Plus, Globe, Star, Clock, ArrowRight, Plane, Camera, Coffee, User, Settings, Edit3, X, Heart, Award, Languages } from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS - Define data structures for type safety
// ============================================================================

// Trip interface - represents a travel itinerary
interface Trip {
  id: number;                    // Unique identifier
  destination: string;           // Main destination name
  cities: string[];             // List of cities to visit
  dates: string;                // Travel date range
  budget: string;               // Trip budget in currency
  status: 'Planning' | 'Booked' | 'Completed'; // Trip status
  progress: number;             // Planning completion percentage (0-100)
  image: string;                // Emoji or image representation
}

// Destination interface - represents popular travel destinations
interface Destination {
  name: string;                 // Destination name
  country: string;              // Country name
  rating: number;               // User rating (1-5)
  trips: number;                // Number of trips planned to this destination
  image: string;                // Emoji or image representation
}

// Activity interface - represents recent user activities
interface Activity {
  action: string;               // Description of the action
  location: string;             // Location where action occurred
  time: string;                 // Time when action occurred
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; // Icon component
}

// Travel statistics interface
interface TravelStats {
  tripsPlanned: number;         // Total number of trips planned
  citiesVisited: number;        // Total cities visited
  totalBudget: string;          // Total budget across all trips
}

// Tab types for trip categorization
type TabType = 'upcoming' | 'past' | 'shared';

// User profile interface - complete user information
interface UserProfile {
  name: string;                 // Full name
  email: string;                // Email address
  phone: string;                // Phone number
  location: string;             // Current location
  joinDate: string;             // When user joined the platform
  avatar: string;               // Avatar initials or image
  bio: string;                  // User biography
  age: number;                  // User age
  travelPreference: string;     // Preferred travel style
  languages: string[];          // Languages spoken
}

// ============================================================================
// MAIN COMPONENT - UserProfile Dashboard
// ============================================================================
export default function UserProfile() {
  // ============================================================================
  // STATE MANAGEMENT - React hooks for component state
  // ============================================================================
  
  // Active tab for trip categorization (upcoming, past, shared)
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  
  // Controls profile modal visibility
  const [showProfile, setShowProfile] = useState(false);
  
  // Controls profile editing mode
  const [isEditing, setIsEditing] = useState(false);
  
  // User profile data with default values
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    joinDate: 'January 2023',
    avatar: 'JD',
    bio: 'Passionate traveler exploring the world one destination at a time.',
    age: 28,
    travelPreference: 'Adventure & Culture',
    languages: ['English', 'Hindi', 'Spanish']
  });

  // ============================================================================
  // MOCK DATA - Sample data for demonstration (replace with API calls)
  // ============================================================================
  
  // Pre-planned trips data - trips user has planned but not yet taken
  const prePlannedTrips = [
    {
      id: 1,
      destination: 'Switzerland Alps',
      image: '🏔️',                    // Emoji representation
      duration: '7 days',
      budget: '₹4,50,000',
      status: 'Planning'               // Current planning status
    },
    {
      id: 2,
      destination: 'Maldives',
      image: '🏖️',
      duration: '5 days',
      budget: '₹3,20,000',
      status: 'Booked'                 // Trip is confirmed/booked
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

  // Previous trips data - completed trips with ratings
  const previousTrips = [
    {
      id: 1,
      destination: 'Paris',
      image: '🇫🇷',                    // Country flag emoji
      duration: '6 days',
      budget: '₹3,80,000',
      rating: 5,                       // User rating out of 5 stars
      year: '2024'                     // Year trip was completed
    },
    {
      id: 2,
      destination: 'Bali',
      image: '🇮🇩',
      duration: '8 days',
      budget: '₹2,50,000',
      rating: 4,
      year: '2023'
    },
    {
      id: 3,
      destination: 'Tokyo',
      image: '🇯🇵',
      duration: '7 days',
      budget: '₹4,20,000',
      rating: 5,
      year: '2023'
    }
  ];
  // Profile editing state - copy of user profile for editing
  const [editProfile, setEditProfile] = useState<UserProfile>(userProfile);
  
  // Active tab in profile modal (info, preplanned trips, previous trips)
  const [activeProfileTab, setActiveProfileTab] = useState<'info' | 'preplanned' | 'previous'>('info');

  // Upcoming trips data - future planned trips with detailed information
  const upcomingTrips: Trip[] = [
    {
      id: 1,
      destination: 'European Grand Tour',
      cities: ['Paris', 'Rome', 'Barcelona'], // Multi-city itinerary
      dates: 'Dec 15 - 28, 2025',
      budget: '₹3,50,000',
      status: 'Planning',                      // Still in planning phase
      progress: 75,                           // 75% planning complete
      image: '🇫🇷'
    },
    {
      id: 2,
      destination: 'Japan Adventure',
      cities: ['Tokyo', 'Kyoto', 'Osaka'],
      dates: 'Mar 8 - 22, 2026',
      budget: '₹3,15,000',
      status: 'Booked',                       // Trip is confirmed
      progress: 100,                          // Planning complete
      image: '🇯🇵'
    }
  ];

  // Past trips data - completed trips for reference
  const pastTrips: Trip[] = [
    {
      id: 3,
      destination: 'Thailand Explorer',
      cities: ['Bangkok', 'Phuket', 'Chiang Mai'],
      dates: 'Jan 10 - 24, 2024',
      budget: '₹2,33,000',
      status: 'Completed',                     // Trip has been completed
      progress: 100,                          // Always 100% for completed trips
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

  // Shared trips data - trips planned with friends or groups
  const sharedTrips: Trip[] = [
    {
      id: 5,
      destination: 'Bali Group Trip',
      cities: ['Ubud', 'Seminyak', 'Canggu'],
      dates: 'Aug 15 - 29, 2025',
      budget: '₹2,00,000',
      status: 'Planning',                      // Group is still planning
      progress: 60,                           // 60% planning complete
      image: '🇮🇩'
    },
    {
      id: 6,
      destination: 'Morocco with Friends',
      cities: ['Marrakech', 'Fez', 'Casablanca'],
      dates: 'Nov 3 - 17, 2025',
      budget: '₹2,58,000',
      status: 'Booked',                       // Group trip is confirmed
      progress: 90,                           // Nearly complete planning
      image: '🇲🇦'
    }
  ];

  // Popular destinations data - trending travel locations with statistics
  const popularDestinations: Destination[] = [
    { name: 'Santorini', country: 'Greece', rating: 4.9, trips: 1245, image: '🏝️' },
    { name: 'Bali', country: 'Indonesia', rating: 4.8, trips: 2341, image: '🌺' },
    { name: 'Dubai', country: 'UAE', rating: 4.7, trips: 1876, image: '🏙️' },
    { name: 'Maldives', country: 'Maldives', rating: 4.9, trips: 987, image: '🏖️' },
    { name: 'Swiss Alps', country: 'Switzerland', rating: 4.8, trips: 1432, image: '🏔️' },
    { name: 'Tuscany', country: 'Italy', rating: 4.7, trips: 1654, image: '🍷' }
  ];

  // Recent activities data - user's recent actions on the platform
  const recentActivities: Activity[] = [
    { action: 'Added new stop', location: 'Venice', time: '2 hours ago', icon: MapPin },
    { action: 'Updated budget', location: 'European Trip', time: '5 hours ago', icon: () => <span className="text-teal-400 font-bold">₹</span> },
    { action: 'Shared itinerary', location: 'Japan Adventure', time: '1 day ago', icon: Users }
  ];

  // Travel statistics - aggregated user travel data
  const travelStats: TravelStats = {
    tripsPlanned: 12,                         // Total trips planned by user
    citiesVisited: 28,                       // Total unique cities visited
    totalBudget: '₹20,50,000'                // Total budget across all trips
  };

  // ============================================================================
  // UTILITY FUNCTIONS - Helper functions for component logic
  // ============================================================================
  
  // Returns appropriate Tailwind CSS classes based on trip status
  const getStatusColor = (status: Trip['status']): string => {
    switch (status) {
      case 'Booked':
        return 'bg-green-100 text-green-700';   // Green for confirmed trips
      case 'Completed':
        return 'bg-blue-100 text-blue-700';     // Blue for completed trips
      default:
        return 'bg-yellow-100 text-yellow-700'; // Yellow for planning status
    }
  };

  // ============================================================================
  // EVENT HANDLERS - Functions that handle user interactions
  // ============================================================================
  
  // Handles tab switching for trip categories
  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
  };

  // Navigates to trip planning page
  const handlePlanNewTrip = (): void => {
    window.location.href = '/plan-trip';
  };

  // Handles trip card clicks (placeholder for navigation)
  const handleTripClick = (tripId: number): void => {
    console.log(`Navigate to trip ${tripId}`);
    // TODO: Implement navigation to trip details page
  };

  // Handles destination card clicks (placeholder for navigation)
  const handleDestinationClick = (destination: string): void => {
    console.log(`Navigate to ${destination}`);
    // TODO: Implement navigation to destination details page
  };

  // Returns appropriate trip array based on active tab
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

  // Saves profile changes and exits edit mode
  const handleProfileSave = () => {
    setUserProfile(editProfile);
    setIsEditing(false);
  };

  // Cancels profile editing and reverts changes
  const handleProfileCancel = () => {
    setEditProfile(userProfile);
    setIsEditing(false);
  };

  // ============================================================================
  // COMPONENT RENDER - JSX structure and UI elements
  // ============================================================================
  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      {/* ========================================================================
          HEADER SECTION - Top navigation bar with branding and user actions
          ======================================================================== */}
      <header className="bg-slate-900 px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand logo and title */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">GlobeTrotter</h1>
              <p className="text-xs sm:text-sm text-teal-300 hidden sm:block">Premium Travel Planning</p>
            </div>
          </div>
          
          {/* Header action buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Plan new trip button with responsive text */}
            <button 
              className="px-3 py-2 sm:px-6 sm:py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:bg-yellow-300 transform hover:-translate-y-0.5 text-sm sm:text-base"
              onClick={handlePlanNewTrip}
              type="button"
            >
              <Plus className="w-4 h-4 inline mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Plan New Trip</span>
              <span className="sm:hidden">Plan</span>
            </button>
            {/* User avatar button to open profile modal */}
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setShowProfile(true)}
            >
              <span className="text-white font-semibold text-sm sm:text-base">{userProfile.avatar}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================
          MAIN CONTENT AREA - Dashboard content with responsive layout
          ======================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome message with personalized greeting */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900">
            Welcome back, {userProfile.name.split(' ')[0]}! ✈️
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Ready to plan your next extraordinary journey?
          </p>
        </div>

        {/* Responsive grid layout: single column on mobile, 3-column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ====================================================================
              LEFT COLUMN - Main dashboard content (trips and destinations)
              ==================================================================== */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Trip management section with tabbed interface */}
            <div>
              {/* Section header with tab navigation */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Your Trips</h3>
                {/* Tab buttons for trip categories */}
                <div className="flex space-x-1 sm:space-x-2 overflow-x-auto">
                  {(['upcoming', 'past', 'shared'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
                        activeTab === tab 
                          ? 'bg-slate-900 text-white'     // Active tab styling
                          : 'text-gray-600 hover:bg-gray-100' // Inactive tab styling
                      }`}
                      type="button"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trip cards container */}
              <div className="space-y-4">
                {getCurrentTrips().map((trip: Trip) => (
                  /* Individual trip card with hover effects and accessibility */
                  <div 
                    key={trip.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => handleTripClick(trip.id)}
                    role="button"                    // Accessibility: indicates clickable element
                    tabIndex={0}                     // Accessibility: keyboard navigation
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
                            <span className="text-teal-400 font-bold text-base">₹</span>
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
                    <span className="text-teal-400 font-bold text-sm">₹</span>
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
                  onClick={handlePlanNewTrip}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  type="button"
                >
                  <Plus className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-gray-600">Plan New Trip</span>
                </button>
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
                <button 
                  onClick={() => setShowProfile(true)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  type="button"
                >
                  <Settings className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-gray-600">Profile Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Profile</h3>
                <button 
                  onClick={() => setShowProfile(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">{userProfile.avatar}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-900">{userProfile.name}</h4>
                <p className="text-gray-600">{userProfile.email}</p>
                <p className="text-sm text-gray-500 mt-2">{userProfile.bio}</p>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveProfileTab('info')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeProfileTab === 'info' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Info
                </button>
                <button
                  onClick={() => setActiveProfileTab('preplanned')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeProfileTab === 'preplanned' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Pre-planned
                </button>
                <button
                  onClick={() => setActiveProfileTab('previous')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeProfileTab === 'previous' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Previous
                </button>
              </div>

              {/* Tab Content */}
              {activeProfileTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-teal-400" />
                      <div>
                        <p className="text-sm text-gray-600">Age</p>
                        <p className="font-medium">{userProfile.age} years</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-teal-400" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium">{userProfile.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-teal-400" />
                    <div>
                      <p className="text-sm text-gray-600">Travel Preference</p>
                      <p className="font-medium">{userProfile.travelPreference}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Languages className="w-5 h-5 text-teal-400" />
                    <div>
                      <p className="text-sm text-gray-600">Languages</p>
                      <p className="font-medium">{userProfile.languages.join(', ')}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-teal-400" />
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="font-medium">{userProfile.joinDate}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeProfileTab === 'preplanned' && (
                <div className="space-y-3">
                  {prePlannedTrips.map((trip) => (
                    <div key={trip.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{trip.image}</span>
                          <div>
                            <h5 className="font-semibold text-slate-900">{trip.destination}</h5>
                            <p className="text-sm text-gray-600">{trip.duration} • {trip.budget}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'Booked' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {trip.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeProfileTab === 'previous' && (
                <div className="space-y-3">
                  {previousTrips.map((trip) => (
                    <div key={trip.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{trip.image}</span>
                          <div>
                            <h5 className="font-semibold text-slate-900">{trip.destination}</h5>
                            <p className="text-sm text-gray-600">{trip.duration} • {trip.budget} • {trip.year}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(trip.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 flex items-center justify-center space-x-2 p-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => setShowProfile(false)}
                    className="flex-1 p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
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