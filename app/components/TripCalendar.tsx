"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Trip {
  _id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'booked' | 'completed' | 'cancelled';
  travelers: number;
  budget: string;
}

interface TripCalendarProps {
  userId?: string;
}

export default function TripCalendar({ userId }: TripCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && userId) {
      fetchTrips();
    }
  }, [isOpen, userId]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/trips?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setTrips(data.trips || []);
      }
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTripForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return trips.find(trip => {
      const startDate = new Date(trip.startDate).toISOString().split('T')[0];
      const endDate = new Date(trip.endDate).toISOString().split('T')[0];
      return dateStr >= startDate && dateStr <= endDate;
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'booked': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden md:inline font-medium">My Trips</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Trip Calendar</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h4 className="text-lg font-medium text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h4>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {emptyDays.map(day => (
                  <div key={`empty-${day}`} className="h-8"></div>
                ))}
                {days.map(day => {
                  const trip = getTripForDate(day);
                  return (
                    <div
                      key={day}
                      className={`h-8 flex items-center justify-center text-sm rounded-md relative group cursor-pointer ${
                        trip 
                          ? `${getStatusColor(trip.status)} font-medium` 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {day}
                      {trip && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          <div className="font-medium">{trip.destination}</div>
                          <div className="text-xs opacity-75">{trip.status}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {loading && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600 mx-auto"></div>
                </div>
              )}

              {trips.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Upcoming Trips</h5>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {trips.filter(trip => new Date(trip.startDate) >= new Date()).slice(0, 3).map(trip => (
                      <div key={trip._id} className="flex items-center space-x-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(trip.status).split(' ')[0]}`}></div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{trip.destination}</div>
                          <div className="text-gray-500">
                            {new Date(trip.startDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}