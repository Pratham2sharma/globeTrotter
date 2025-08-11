"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from '../components/Footer';

interface Activity {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  duration: string;
  price: string;
  groupSize: string;
  description: string;
}

export default function ActivitySearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const activities: Activity[] = [
    {
      id: 1,
      name: "Eiffel Tower Skip-the-Line Tour",
      category: "Sightseeing",
      location: "Paris, France",
      image: "🇫🇷",
      rating: 4.8,
      reviews: 2847,
      duration: "2 hours",
      price: "₹3,500",
      groupSize: "Up to 20",
      description: "Skip the crowds and explore the iconic Eiffel Tower with expert guide",
    },
    {
      id: 2,
      name: "Bali Volcano Sunrise Trekking",
      category: "Adventure",
      location: "Bali, Indonesia",
      image: "🇮🇩",
      rating: 4.9,
      reviews: 1523,
      duration: "6 hours",
      price: "₹4,200",
      groupSize: "Up to 12",
      description: "Experience breathtaking sunrise views from Mount Batur volcano",
    },
    {
      id: 3,
      name: "Tokyo Food Walking Tour",
      category: "Food & Drink",
      location: "Tokyo, Japan",
      image: "🇯🇵",
      rating: 4.7,
      reviews: 3241,
      duration: "4 hours",
      price: "₹5,800",
      groupSize: "Up to 8",
      description: "Discover authentic Japanese cuisine in hidden local spots",
    },
    {
      id: 4,
      name: "Dubai Desert Safari",
      category: "Adventure",
      location: "Dubai, UAE",
      image: "🇦🇪",
      rating: 4.6,
      reviews: 4156,
      duration: "6 hours",
      price: "₹6,500",
      groupSize: "Up to 30",
      description: "Thrilling desert adventure with dune bashing and camel riding",
    },
    {
      id: 5,
      name: "Louvre Museum Private Tour",
      category: "Culture",
      location: "Paris, France",
      image: "🇫🇷",
      rating: 4.9,
      reviews: 892,
      duration: "3 hours",
      price: "₹8,900",
      groupSize: "Up to 6",
      description: "Private guided tour of world's most famous art museum",
    },
    {
      id: 6,
      name: "Swiss Alps Paragliding",
      category: "Adventure",
      location: "Interlaken, Switzerland",
      image: "🇨🇭",
      rating: 4.8,
      reviews: 756,
      duration: "3 hours",
      price: "₹12,500",
      groupSize: "Up to 4",
      description: "Soar above the stunning Swiss Alps with professional instructors",
    },
  ];

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
        activity.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || activity.category === categoryFilter;
      const matchesPrice =
        priceFilter === "All" ||
        (priceFilter === "Under ₹5,000" &&
          parseInt(activity.price.replace(/[₹,]/g, "")) < 5000) ||
        (priceFilter === "₹5,000 - ₹10,000" &&
          parseInt(activity.price.replace(/[₹,]/g, "")) >= 5000 &&
          parseInt(activity.price.replace(/[₹,]/g, "")) <= 10000) ||
        (priceFilter === "Above ₹10,000" &&
          parseInt(activity.price.replace(/[₹,]/g, "")) > 10000);
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return (
            parseInt(a.price.replace(/[₹,]/g, "")) -
            parseInt(b.price.replace(/[₹,]/g, ""))
          );
        case "price-high":
          return (
            parseInt(b.price.replace(/[₹,]/g, "")) -
            parseInt(a.price.replace(/[₹,]/g, ""))
          );
        case "reviews":
          return b.reviews - a.reviews;
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
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 shadow-sm"
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
        <div className="mb-6">
          <p className="text-gray-600">{filteredActivities.length} activities found</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{activity.image}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{activity.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {activity.location}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{activity.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm font-medium">{activity.rating}</span>
                      <span className="text-sm text-gray-500">({activity.reviews})</span>
                    </div>
                    <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full">
                      {activity.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{activity.groupSize}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-5 h-5 text-teal-600" />
                    <span className="text-xl font-bold text-slate-900">{activity.price.replace('₹', '')}</span>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                    Add to Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}