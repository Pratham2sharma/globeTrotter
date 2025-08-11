"use client"

import React, { useState } from 'react';
import { Search, Plus, Trash2, ArrowLeft, Calendar, Users, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Trip {
  id: number;
  name: string;
  destination: string;
  user: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string;
  status: 'Planning' | 'Booked' | 'Completed' | 'Cancelled';
}

export default function AdminTrips() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const trips: Trip[] = [
    { id: 1, name: 'Alpine Adventure', destination: 'Switzerland', user: 'John Doe', startDate: '2024-06-15', endDate: '2024-06-22', travelers: 2, budget: '₹4,50,000', status: 'Planning' },
    { id: 2, name: 'Tropical Paradise', destination: 'Maldives', user: 'Jane Smith', startDate: '2024-05-10', endDate: '2024-05-15', travelers: 2, budget: '₹3,20,000', status: 'Booked' },
    { id: 3, name: 'Desert Luxury', destination: 'Dubai', user: 'Mike Johnson', startDate: '2024-04-20', endDate: '2024-04-24', travelers: 4, budget: '₹2,80,000', status: 'Completed' }
  ];

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'Booked': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Trip Management</h1>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              Add Trip
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search trips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Planning">Planning</option>
              <option value="Booked">Booked</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{trip.name}</h3>
                  <p className="text-sm text-gray-600">{trip.destination}</p>
                  <p className="text-sm text-gray-500">by {trip.user}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(trip.status)}`}>
                  {trip.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {trip.travelers} travelers
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {trip.budget}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  View Details
                </button>
                <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}