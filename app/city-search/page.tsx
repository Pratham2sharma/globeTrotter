"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Search, ArrowLeft, Globe, Star, MapPin, Clock, Users, Flag, Filter, SortAsc, Thermometer } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface City {
  id: number;
  name: string;
  country: string;
  continent: string;
  image: string;
  rating: number;
  reviews: number;
  temperature: string;
  bestTime: string;
  attractions: number;
  description: string;
  popularFor: string[];
  budget: string;
}

export default function CitySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [continentFilter, setContinentFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(decodeURIComponent(query));
    }
  }, [searchParams]);

  const cities: City[] = [
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      continent: 'Europe',
      image: '🇫🇷',
      rating: 4.8,
      reviews: 15420,
      temperature: '15°C - 25°C',
      bestTime: 'Apr - Oct',
      attractions: 127,
      description: 'The City of Light, famous for its art, fashion, and romance',
      popularFor: ['Romance', 'Art', 'Fashion', 'Cuisine'],
      budget: 'High'
    },
    {
      id: 2,
      name: 'Tokyo',
      country: 'Japan',
      continent: 'Asia',
      image: '🇯🇵',
      rating: 4.9,
      reviews: 12847,
      temperature: '10°C - 30°C',
      bestTime: 'Mar - May',
      attractions: 203,
      description: 'Modern metropolis blending tradition with cutting-edge technology',
      popularFor: ['Technology', 'Culture', 'Food', 'Shopping'],
      budget: 'High'
    },
    {
      id: 3,
      name: 'Bali',
      country: 'Indonesia',
      continent: 'Asia',
      image: '🇮🇩',
      rating: 4.7,
      reviews: 18923,
      temperature: '24°C - 32°C',
      bestTime: 'Apr - Oct',
      attractions: 89,
      description: 'Tropical paradise with stunning beaches and rich culture',
      popularFor: ['Beaches', 'Temples', 'Wellness', 'Nature'],
      budget: 'Medium'
    },
    {
      id: 4,
      name: 'New York',
      country: 'USA',
      continent: 'North America',
      image: '🇺🇸',
      rating: 4.6,
      reviews: 22156,
      temperature: '5°C - 28°C',
      bestTime: 'Apr - Jun',
      attractions: 156,
      description: 'The city that never sleeps, hub of culture and business',
      popularFor: ['Broadway', 'Museums', 'Shopping', 'Nightlife'],
      budget: 'High'
    },
    {
      id: 5,
      name: 'Dubai',
      country: 'UAE',
      continent: 'Asia',
      image: '🇦🇪',
      rating: 4.8,
      reviews: 9834,
      temperature: '20°C - 40°C',
      bestTime: 'Nov - Mar',
      attractions: 78,
      description: 'Luxury destination with modern architecture and shopping',
      popularFor: ['Luxury', 'Shopping', 'Architecture', 'Desert'],
      budget: 'High'
    },
    {
      id: 6,
      name: 'Bangkok',
      country: 'Thailand',
      continent: 'Asia',
      image: '🇹🇭',
      rating: 4.5,
      reviews: 16742,
      temperature: '25°C - 35°C',
      bestTime: 'Nov - Feb',
      attractions: 134,
      description: 'Vibrant city known for street food, temples, and nightlife',
      popularFor: ['Street Food', 'Temples', 'Markets', 'Nightlife'],
      budget: 'Low'
    }
  ];

  const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];
  const budgetRanges = ['All', 'Low', 'Medium', 'High'];

  const filteredCities = cities
    .filter(city => {
      const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           city.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           city.popularFor.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesContinent = continentFilter === 'All' || city.continent === continentFilter;
      const matchesBudget = budgetFilter === 'All' || city.budget === budgetFilter;
      return matchesSearch && matchesContinent && matchesBudget;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'attractions':
          return b.attractions - a.attractions;
        case 'name':
          return a.name.localeCompare(b.name);
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
              <h1 className="text-2xl font-bold text-white">City Search</h1>
              <p className="text-yellow-300 text-sm">Explore destinations worldwide</p>
            </div>
          </div>
          
          <button 
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={() => router.push('/plan-trip')}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Plan Trip
          </button>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cities, countries, or interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 shadow-sm"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={continentFilter}
                  onChange={(e) => setContinentFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 shadow-sm"
                >
                  {continents.map((continent) => (
                    <option key={continent} value={continent}>
                      {continent === 'All' ? 'All Continents' : continent}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-200 shadow-sm"
                >
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range === 'All' ? 'All Budgets' : `${range} Budget`}
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
                  <option value="reviews">Most Reviewed</option>
                  <option value="attractions">Most Attractions</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <p className="text-gray-600">{filteredCities.length} destinations found</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div key={city.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{city.image}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{city.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {city.country}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{city.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm font-medium">{city.rating}</span>
                      <span className="text-sm text-gray-500">({city.reviews})</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      {city.budget} Budget
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{city.bestTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{city.attractions} attractions</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {city.popularFor.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Thermometer className="w-4 h-4" />
                    <span>{city.temperature}</span>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                    Explore
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