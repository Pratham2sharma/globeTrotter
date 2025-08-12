"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Search, Globe, Star, MapPin, Clock, Users, Flag, Filter, SortAsc, Thermometer } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';


interface City {
  _id: string;
  name: string;
  country: string;
  state?: string;
  description: string;
  imageUrl?: string;
  rating?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function CitySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [continentFilter, setContinentFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(decodeURIComponent(query));
    }
    fetchCities();
  }, [searchParams]);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cities');
      if (response.ok) {
        const data = await response.json();
        setCities(data.cities || []);
      } else {
        setError('Failed to fetch cities');
      }
    } catch (err) {
      setError('Error loading cities');
    } finally {
      setLoading(false);
    }
  };

  const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];
  const budgetRanges = ['All', 'Low', 'Medium', 'High'];

  const filteredCities = cities
    .filter((city: City) => {
      const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           city.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (city.state && city.state.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    })
    .sort((a: City, b: City) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />


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
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cities...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">{error}</div>
            <button 
              onClick={fetchCities}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredCities.length === 0 ? (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No cities found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city: City) => (
              <div
                key={city._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-yellow-200 hover:border-yellow-400"
                onClick={() => router.push(`/trip/new?destination=${encodeURIComponent(city.name)}`)}
              >
                <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  {city.imageUrl ? (
                    <img src={city.imageUrl} alt={city.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-6xl text-white">🏙️</div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{city.name}</h3>
                    {city.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-600">{city.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{city.country}{city.state && `, ${city.state}`}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{city.description}</p>
                  
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 font-medium">
                    Plan Trip Here
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}