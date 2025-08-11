"use client"

import React, { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Users, DollarSign, Star, Clock, Plus, Globe, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Trip {
  id: number;
  destination: string;
  country: string;
  image: string;
  startDate: string;
  endDate: string;
  duration: string;
  travelers: number;
  budget: string;
  status: 'Planning' | 'Booked' | 'Completed' | 'Cancelled';
  rating?: number;
  travelStyle: string;
  createdAt: string;
}

export default function MyTrips() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Sample trip data
  const trips: Trip[] = [
    {
      id: 1,
      destination: 'Switzerland Alps',
      country: 'Switzerland',
      image: '🏔️',
      startDate: '2024-06-15',
      endDate: '2024-06-22',
      duration: '7 days',
      travelers: 2,
      budget: '₹4,50,000',
      status: 'Planning',
      travelStyle: 'Adventure',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      destination: 'Maldives',
      country: 'Maldives',
      image: '🏖️',
      startDate: '2024-05-10',
      endDate: '2024-05-15',
      duration: '5 days',
      travelers: 2,
      budget: '₹3,20,000',
      status: 'Booked',
      travelStyle: 'Luxury',
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      destination: 'Dubai',
      country: 'UAE',
      image: '🏙️',
      startDate: '2024-04-20',
      endDate: '2024-04-24',
      duration: '4 days',
      travelers: 4,
      budget: '₹2,80,000',
      status: 'Planning',
      travelStyle: 'Luxury',
      createdAt: '2024-01-05'
    },
    {
      id: 4,
      destination: 'Paris',
      country: 'France',
      image: '🇫🇷',
      startDate: '2023-12-15',
      endDate: '2023-12-21',
      duration: '6 days',
      travelers: 2,
      budget: '₹3,80,000',
      status: 'Completed',
      rating: 5,
      travelStyle: 'Cultural',
      createdAt: '2023-10-15'
    },
    {
      id: 5,
      destination: 'Bali',
      country: 'Indonesia',
      image: '🇮🇩',
      startDate: '2023-08-10',
      endDate: '2023-08-18',
      duration: '8 days',
      travelers: 3,
      budget: '₹2,50,000',
      status: 'Completed',
      rating: 4,
      travelStyle: 'Relaxation',
      createdAt: '2023-06-10'
    },
    {
      id: 6,
      destination: 'Tokyo',
      country: 'Japan',
      image: '🇯🇵',
      startDate: '2023-03-20',
      endDate: '2023-03-27',
      duration: '7 days',
      travelers: 1,
      budget: '₹4,20,000',
      status: 'Completed',
      rating: 5,
      travelStyle: 'Cultural',
      createdAt: '2023-01-20'
    }
  ];

  // Filter and sort trips
  const filteredTrips = trips
    .filter(trip => {
      const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trip.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'destination':
          return a.destination.localeCompare(b.destination);
        case 'date':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'bg-yellow-100 text-yellow-700';
      case 'Booked':
        return 'bg-green-100 text-green-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-900 px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Trips</h1>
                <p className="text-sm text-teal-300">Manage your travel adventures</p>
              </div>
            </div>
          </div>
          
          <button 
            className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            onClick={() => router.push('/plan-trip')}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Plan New Trip
          </button>
        </div>
      </header>

      {/* Filters and Search */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Planning">Planning</option>
                <option value="Booked">Booked</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="destination">By Destination</option>
                <option value="date">By Travel Date</option>
              </select>
            </div>
          </div>

          {/* Trip Stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{trips.length}</div>
              <div className="text-sm text-gray-600">Total Trips</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{trips.filter(t => t.status === 'Completed').length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{trips.filter(t => t.status === 'Planning').length}</div>
              <div className="text-sm text-gray-600">Planning</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{trips.filter(t => t.status === 'Booked').length}</div>
              <div className="text-sm text-gray-600">Booked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filteredTrips.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No trips found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filters' 
                : 'Start planning your first adventure!'}
            </p>
            <button 
              className="px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              onClick={() => router.push('/plan-trip')}
            >
              Plan Your First Trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                {/* Trip Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{trip.image}</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{trip.destination}</h3>
                      <p className="text-sm text-gray-600">{trip.country}</p>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                          {trip.status}
                        </span>
                        {trip.rating && (
                          <div className="flex items-center ml-3">
                            {[...Array(trip.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {formatDate(trip.startDate)}
                      </div>
                      <div className="text-xs text-gray-600">{trip.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-teal-400" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {trip.travelers} {trip.travelers === 1 ? 'Traveler' : 'Travelers'}
                      </div>
                      <div className="text-xs text-gray-600">{trip.travelStyle}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-teal-400" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">{trip.budget}</div>
                      <div className="text-xs text-gray-600">Total Budget</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-teal-400" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {formatDate(trip.createdAt)}
                      </div>
                      <div className="text-xs text-gray-600">Created</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <button className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
                    View Details
                  </button>
                  {trip.status === 'Planning' && (
                    <button className="flex-1 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
                      Continue Planning
                    </button>
                  )}
                  {trip.status === 'Completed' && (
                    <button className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors">
                      Book Again
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}