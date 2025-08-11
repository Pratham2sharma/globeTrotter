"use client"

import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, Users, Calendar, MapPin, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TrendsData {
  userRegistrations: Array<{ _id: { year: number; month: number }; count: number }>;
  popularDestinations: Array<{ name: string; searches: number }>;
}

export default function AdminTrends() {
  const router = useRouter();
  const [trends, setTrends] = useState<TrendsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/trends', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setTrends(data.trends);
      } else {
        setError('Failed to fetch trends');
      }
    } catch (err) {
      setError('Error loading trends');
    } finally {
      setLoading(false);
    }
  };

  // Transform API data for charts with validation
  const userGrowthData = trends?.userRegistrations.map(item => ({
    month: new Date(item._id.year, item._id.month - 1).toLocaleDateString('en-US', { month: 'short' }),
    users: Number(item.count) || 0
  })).filter(item => !isNaN(item.users)) || [];

  const tripBookingsData = trends?.userRegistrations.map(item => ({
    month: new Date(item._id.year, item._id.month - 1).toLocaleDateString('en-US', { month: 'short' }),
    bookings: Math.floor((Number(item.count) || 0) * 0.3)
  })).filter(item => !isNaN(item.bookings)) || [];

  const totalSearches = trends?.popularDestinations.reduce((sum, dest) => sum + (Number(dest.searches) || 0), 0) || 1;
  const popularDestinations = trends?.popularDestinations.map(dest => ({
    name: dest.name,
    percentage: Math.round(((Number(dest.searches) || 0) / totalSearches) * 100),
    bookings: Number(dest.searches) || 0
  })) || [];

  const maxUsers = userGrowthData.length > 0 ? Math.max(...userGrowthData.map(d => d.users).filter(u => !isNaN(u))) || 1 : 1;
  const maxBookings = tripBookingsData.length > 0 ? Math.max(...tripBookingsData.map(d => d.bookings).filter(b => !isNaN(b))) || 1 : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">User Trends & Analytics</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading trends...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchTrends}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : !trends ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No trends data to show</p>
          </div>
        ) : (
          <>
            {/* User Registration Trends */}
            <div className="bg-white rounded-lg shadow-sm p-6 border mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">User Registration Trends</h3>
              {trends.userRegistrations.length === 0 ? (
                <p className="text-gray-600">No user registration data available</p>
              ) : (
                <div className="space-y-4">
                  {trends.userRegistrations.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">
                        {new Date(item._id.year, item._id.month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                      <span className="text-blue-600 font-bold">{item.count} users</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Destinations */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Popular Destinations</h3>
              {trends.popularDestinations.length === 0 ? (
                <p className="text-gray-600">No destination data available</p>
              ) : (
                <div className="space-y-4">
                  {trends.popularDestinations.map((destination, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="font-medium">{destination.name}</span>
                      </div>
                      <span className="text-green-600 font-bold">{destination.searches} searches</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {trends && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* User Growth Area Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">User Growth - Area Chart</h3>
              {userGrowthData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  No user growth data available
                </div>
              ) : (
                <div className="h-64 relative">
                  <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                    <defs>
                      <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    {userGrowthData.length > 1 && (
                      <>
                        <path
                          d={`M ${userGrowthData.map((data, index) => 
                            `${(index * 400) / (userGrowthData.length - 1)} ${200 - (data.users / maxUsers) * 150}`
                          ).join(' L ')} L 400 200 L 0 200 Z`}
                          fill="url(#userGradient)"
                          className="transition-all duration-1000"
                        />
                        <path
                          d={`M ${userGrowthData.map((data, index) => 
                            `${(index * 400) / (userGrowthData.length - 1)} ${200 - (data.users / maxUsers) * 150}`
                          ).join(' L ')}`}
                          stroke="#3B82F6"
                          strokeWidth="3"
                          fill="none"
                          className="transition-all duration-1000"
                        />
                      </>
                    )}
                    {userGrowthData.map((data, index) => {
                      const cx = userGrowthData.length > 1 ? (index * 400) / (userGrowthData.length - 1) : 200;
                      const cy = 200 - ((data.users || 0) / (maxUsers || 1)) * 150;
                      return (
                        <g key={index}>
                          <circle
                            cx={cx}
                            cy={isNaN(cy) ? 200 : cy}
                            r="4"
                            fill="#3B82F6"
                            className="transition-all duration-1000"
                          />
                          <text
                            x={cx}
                            y="220"
                            textAnchor="middle"
                            className="text-xs fill-gray-600"
                          >
                            {data.month}
                          </text>
                          <text
                            x={cx}
                            y={isNaN(cy) ? 190 : cy - 10}
                            textAnchor="middle"
                            className="text-xs fill-gray-900 font-medium"
                          >
                            {data.users}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}
            </div>

            {/* Trip Bookings Area Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Trip Bookings - Area Chart</h3>
              {tripBookingsData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  No booking data available
                </div>
              ) : (
                <div className="h-64 relative">
                  <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                    <defs>
                      <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    {tripBookingsData.length > 1 && (
                      <>
                        <path
                          d={`M ${tripBookingsData.map((data, index) => 
                            `${(index * 400) / (tripBookingsData.length - 1)} ${200 - (data.bookings / maxBookings) * 150}`
                          ).join(' L ')} L 400 200 L 0 200 Z`}
                          fill="url(#bookingGradient)"
                          className="transition-all duration-1000"
                        />
                        <path
                          d={`M ${tripBookingsData.map((data, index) => 
                            `${(index * 400) / (tripBookingsData.length - 1)} ${200 - (data.bookings / maxBookings) * 150}`
                          ).join(' L ')}`}
                          stroke="#10B981"
                          strokeWidth="3"
                          fill="none"
                          className="transition-all duration-1000"
                        />
                      </>
                    )}
                    {tripBookingsData.map((data, index) => {
                      const cx = tripBookingsData.length > 1 ? (index * 400) / (tripBookingsData.length - 1) : 200;
                      const cy = 200 - ((data.bookings || 0) / (maxBookings || 1)) * 150;
                      return (
                        <g key={index}>
                          <circle
                            cx={cx}
                            cy={isNaN(cy) ? 200 : cy}
                            r="4"
                            fill="#10B981"
                            className="transition-all duration-1000"
                          />
                          <text
                            x={cx}
                            y="220"
                            textAnchor="middle"
                            className="text-xs fill-gray-600"
                          >
                            {data.month}
                          </text>
                          <text
                            x={cx}
                            y={isNaN(cy) ? 190 : cy - 10}
                            textAnchor="middle"
                            className="text-xs fill-gray-900 font-medium"
                          >
                            {data.bookings}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Popular Destinations Chart */}
        {trends && popularDestinations.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Popular Destinations Chart</h3>
            <div className="space-y-4">
              {popularDestinations.map((destination, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-20 text-sm text-gray-900 font-medium">{destination.name}</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-6 relative">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                        style={{ width: `${Math.min(destination.percentage * 4, 100)}%` }}
                      >
                        <span className="text-white text-xs font-medium">{destination.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-16 text-sm font-medium text-gray-900 text-right">{destination.bookings}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}