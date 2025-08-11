"use client"

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterSelect from '../components/FilterSelect';
import CityCard from '../components/CityCard';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [continentFilter, setContinentFilter] = useState('All');
  const [budgetFilter, setBudgetFilter] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

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
      <Header 
        title="City Search" 
        subtitle="Explore destinations worldwide"
        rightContent={
          <button 
            className="px-6 py-2 bg-yellow-400 text-slate-900 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            onClick={() => router.push('/plan-trip')}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Plan Trip
          </button>
        }
      />

      {/* Search and Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="space-y-4">
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search cities, countries, or interests..."
            />

            <div className="flex flex-wrap gap-4">
              <FilterSelect 
                value={continentFilter}
                onChange={setContinentFilter}
                options={continents}
              />

              <FilterSelect 
                value={budgetFilter}
                onChange={setBudgetFilter}
                options={budgetRanges.map(range => range === 'All' ? 'All Budgets' : `${range} Budget`)}
              />

              <FilterSelect 
                value={sortBy}
                onChange={setSortBy}
                options={['Highest Rated', 'Most Reviewed', 'Most Attractions', 'Alphabetical']}
              />
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
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </div>
  );
}