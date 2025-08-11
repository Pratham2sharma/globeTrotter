import React from 'react';
import { Star, MapPin, Thermometer, Plane } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface City {
  id: number;
  name: string;
  country: string;
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

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  const router = useRouter();

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case 'Low':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'High':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{city.image}</span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{city.name}</h3>
              <p className="text-sm text-gray-600">{city.country}</p>
            </div>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBudgetColor(city.budget)}`}>
            {city.budget}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4">{city.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="text-sm font-medium">{city.rating}</span>
              <span className="text-sm text-gray-500">({city.reviews})</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{city.attractions} attractions</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Thermometer className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{city.temperature}</span>
            </div>
            <span className="text-sm text-gray-600">Best: {city.bestTime}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {city.popularFor.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full">
                {tag}
              </span>
            ))}
            {city.popularFor.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                +{city.popularFor.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            onClick={() => router.push(`/city-details/${city.name.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            Explore
          </button>
          <button 
            className="flex-1 px-4 py-2 bg-yellow-400 text-slate-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
            onClick={() => router.push(`/plan-trip?destination=${encodeURIComponent(city.name)}`)}
          >
            <Plane className="w-4 h-4 inline mr-1" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}