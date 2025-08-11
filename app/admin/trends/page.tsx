"use client"

import React from 'react';
import { ArrowLeft, TrendingUp, Users, Calendar, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminTrends() {
  const router = useRouter();

  // Sample data for charts
  const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 180 },
    { month: 'Mar', users: 240 },
    { month: 'Apr', users: 320 },
    { month: 'May', users: 450 },
    { month: 'Jun', users: 580 }
  ];

  const tripBookingsData = [
    { month: 'Jan', bookings: 45 },
    { month: 'Feb', bookings: 67 },
    { month: 'Mar', bookings: 89 },
    { month: 'Apr', bookings: 123 },
    { month: 'May', bookings: 156 },
    { month: 'Jun', bookings: 189 }
  ];

  const popularDestinations = [
    { name: 'Paris', bookings: 89, percentage: 25 },
    { name: 'Tokyo', bookings: 76, percentage: 21 },
    { name: 'Bali', bookings: 65, percentage: 18 },
    { name: 'Dubai', bookings: 54, percentage: 15 },
    { name: 'London', bookings: 43, percentage: 12 },
    { name: 'Others', bookings: 32, percentage: 9 }
  ];

  const maxUsers = Math.max(...userGrowthData.map(d => d.users));
  const maxBookings = Math.max(...tripBookingsData.map(d => d.bookings));

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
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Bookings</p>
                <p className="text-2xl font-bold text-gray-900">189</p>
                <p className="text-sm text-green-600">+21% from last month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900">18.5%</p>
                <p className="text-sm text-green-600">+3.2% from last month</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="bg-orange-500 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Destination</p>
                <p className="text-2xl font-bold text-gray-900">Paris</p>
                <p className="text-sm text-gray-600">89 bookings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Growth Area Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">User Growth - Area Chart</h3>
            <div className="h-64 relative">
              <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 ${200 - (userGrowthData[0].users / maxUsers) * 150} 
                      L 80 ${200 - (userGrowthData[1].users / maxUsers) * 150} 
                      L 160 ${200 - (userGrowthData[2].users / maxUsers) * 150} 
                      L 240 ${200 - (userGrowthData[3].users / maxUsers) * 150} 
                      L 320 ${200 - (userGrowthData[4].users / maxUsers) * 150} 
                      L 400 ${200 - (userGrowthData[5].users / maxUsers) * 150} 
                      L 400 200 L 0 200 Z`}
                  fill="url(#userGradient)"
                  className="transition-all duration-1000"
                />
                <path
                  d={`M 0 ${200 - (userGrowthData[0].users / maxUsers) * 150} 
                      L 80 ${200 - (userGrowthData[1].users / maxUsers) * 150} 
                      L 160 ${200 - (userGrowthData[2].users / maxUsers) * 150} 
                      L 240 ${200 - (userGrowthData[3].users / maxUsers) * 150} 
                      L 320 ${200 - (userGrowthData[4].users / maxUsers) * 150} 
                      L 400 ${200 - (userGrowthData[5].users / maxUsers) * 150}`}
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  className="transition-all duration-1000"
                />
                {userGrowthData.map((data, index) => (
                  <g key={index}>
                    <circle
                      cx={index * 80}
                      cy={200 - (data.users / maxUsers) * 150}
                      r="4"
                      fill="#3B82F6"
                      className="transition-all duration-1000"
                    />
                    <text
                      x={index * 80}
                      y="220"
                      textAnchor="middle"
                      className="text-xs fill-gray-600"
                    >
                      {data.month}
                    </text>
                    <text
                      x={index * 80}
                      y={200 - (data.users / maxUsers) * 150 - 10}
                      textAnchor="middle"
                      className="text-xs fill-gray-900 font-medium"
                    >
                      {data.users}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Trip Bookings Area Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Trip Bookings - Area Chart</h3>
            <div className="h-64 relative">
              <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                <defs>
                  <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 ${200 - (tripBookingsData[0].bookings / maxBookings) * 150} 
                      L 80 ${200 - (tripBookingsData[1].bookings / maxBookings) * 150} 
                      L 160 ${200 - (tripBookingsData[2].bookings / maxBookings) * 150} 
                      L 240 ${200 - (tripBookingsData[3].bookings / maxBookings) * 150} 
                      L 320 ${200 - (tripBookingsData[4].bookings / maxBookings) * 150} 
                      L 400 ${200 - (tripBookingsData[5].bookings / maxBookings) * 150} 
                      L 400 200 L 0 200 Z`}
                  fill="url(#bookingGradient)"
                  className="transition-all duration-1000"
                />
                <path
                  d={`M 0 ${200 - (tripBookingsData[0].bookings / maxBookings) * 150} 
                      L 80 ${200 - (tripBookingsData[1].bookings / maxBookings) * 150} 
                      L 160 ${200 - (tripBookingsData[2].bookings / maxBookings) * 150} 
                      L 240 ${200 - (tripBookingsData[3].bookings / maxBookings) * 150} 
                      L 320 ${200 - (tripBookingsData[4].bookings / maxBookings) * 150} 
                      L 400 ${200 - (tripBookingsData[5].bookings / maxBookings) * 150}`}
                  stroke="#10B981"
                  strokeWidth="3"
                  fill="none"
                  className="transition-all duration-1000"
                />
                {tripBookingsData.map((data, index) => (
                  <g key={index}>
                    <circle
                      cx={index * 80}
                      cy={200 - (data.bookings / maxBookings) * 150}
                      r="4"
                      fill="#10B981"
                      className="transition-all duration-1000"
                    />
                    <text
                      x={index * 80}
                      y="220"
                      textAnchor="middle"
                      className="text-xs fill-gray-600"
                    >
                      {data.month}
                    </text>
                    <text
                      x={index * 80}
                      y={200 - (data.bookings / maxBookings) * 150 - 10}
                      textAnchor="middle"
                      className="text-xs fill-gray-900 font-medium"
                    >
                      {data.bookings}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Popular Destinations */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Popular Destinations</h3>
          <div className="space-y-4">
            {popularDestinations.map((destination, index) => (
              <div key={index} className="flex items-center">
                <div className="w-20 text-sm text-gray-900 font-medium">{destination.name}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-6 relative">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${destination.percentage * 4}%` }}
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
      </div>
    </div>
  );
}