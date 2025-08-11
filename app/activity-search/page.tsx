"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Star,
  Clock,
  Users,
  MapPin,
  ArrowLeft,
  Globe,
  Flag,
  IndianRupee,
  Filter,
  SortAsc,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from '../components/Footer';

interface Activity {
  _id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  cityId?: {
    _id: string;
    name: string;
    country: string;
    state?: string;
    description?: string;
    imageUrl?: string;
  };
}

export default function ActivitySearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities();
  }, [categoryFilter]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter !== 'All') {
        params.append('category', categoryFilter);
      }
      
      const response = await fetch(`/api/activities?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setActivities(data.activities);
      } else {
        setError('Failed to fetch activities');
      }
    } catch (err) {
      setError('Error loading activities');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    "Adventure",
    "Sightseeing",
    "Culture",
    "Food & Drink",
    "Nature",
    "Entertainment",
  ];
  
  const priceRanges = [
    "All",
    "Under ₹5,000",
    "₹5,000 - ₹10,000",
    "Above ₹10,000",
  ];

  const filteredActivities = activities
    .filter((activity) => {
      const matchesSearch =
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (activity.description && activity.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activity.cityId && (
          activity.cityId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.cityId.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (activity.cityId.state && activity.cityId.state.toLowerCase().includes(searchTerm.toLowerCase()))
        ));
      const matchesPrice =
        priceFilter === "All" ||
        (priceFilter === "Under ₹5,000" && activity.price < 5000) ||
        (priceFilter === "₹5,000 - ₹10,000" && activity.price >= 5000 && activity.price <= 10000) ||
        (priceFilter === "Above ₹10,000" && activity.price > 10000);
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 sm:px-6 py-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-all duration-200 hover:scale-105"
            suppressHydrationWarning
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-yellow-400 rounded-full">
              <Globe className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Activity Search</h1>
              <p className="text-yellow-300 text-sm">Discover amazing experiences</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Flag className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-medium text-sm">🇮🇳 India</span>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-b from-white to-gray-50 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search activities and destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 shadow-sm"
                suppressHydrationWarning
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 shadow-sm"
                  suppressHydrationWarning
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "All" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 shadow-sm"
                  suppressHydrationWarning
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range === "All" ? "All Prices" : range}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 shadow-sm"
                  suppressHydrationWarning
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading activities...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchActivities}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">{filteredActivities.length} activities found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <div key={activity._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  {(activity.imageUrl || activity.cityId?.imageUrl) && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={activity.imageUrl || activity.cityId?.imageUrl} 
                        alt={activity.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{activity.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {activity.cityId ? (
                            <span>
                              {activity.location}, {activity.cityId.name}
                              {activity.cityId.state && `, ${activity.cityId.state}`}, {activity.cityId.country}
                            </span>
                          ) : activity.location}
                        </p>
                        {activity.description && (
                          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{activity.description}</p>
                        )}
                      </div>
                      <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full whitespace-nowrap">
                        {activity.category}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-current text-yellow-400" />
                          <span className="text-sm font-medium">{activity.rating}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{activity.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="w-5 h-5 text-teal-600" />
                        <span className="text-xl font-bold text-slate-900">₹{activity.price.toLocaleString()}</span>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                        Add to Trip
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}