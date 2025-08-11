"use client"

import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, ArrowLeft, Star, MapPin, Thermometer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Modal from '../components/Modal';

interface City {
  id: number;
  name: string;
  country: string;
  continent: string;
  rating: number;
  reviews: number;
  temperature: string;
  attractions: number;
  budget: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Inactive';
}

export default function AdminCities() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [continentFilter, setContinentFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [formData, setFormData] = useState({ name: '', country: '', continent: 'Asia', rating: 4.5, reviews: 0, temperature: '', attractions: 0, budget: 'Medium', status: 'Active' });

  const [cities, setCities] = useState<City[]>([
    { id: 1, name: 'Paris', country: 'France', continent: 'Europe', rating: 4.8, reviews: 15420, temperature: '15°C - 25°C', attractions: 127, budget: 'High', status: 'Active' },
    { id: 2, name: 'Tokyo', country: 'Japan', continent: 'Asia', rating: 4.9, reviews: 12847, temperature: '10°C - 30°C', attractions: 203, budget: 'High', status: 'Active' },
    { id: 3, name: 'Bali', country: 'Indonesia', continent: 'Asia', rating: 4.7, reviews: 18923, temperature: '24°C - 32°C', attractions: 89, budget: 'Medium', status: 'Inactive' }
  ]);

  const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];

  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = continentFilter === 'All' || city.continent === continentFilter;
    return matchesSearch && matchesContinent;
  });

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
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
              <h1 className="text-2xl font-bold text-gray-900">City Management</h1>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add City
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
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={continentFilter}
              onChange={(e) => setContinentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {continents.map(continent => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div key={city.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
                  <p className="text-sm text-gray-600">{city.country}</p>
                  <p className="text-xs text-gray-500">{city.continent}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBudgetColor(city.budget)}`}>
                    {city.budget}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    city.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {city.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {city.rating} ({city.reviews})
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {city.attractions} attractions
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Thermometer className="w-4 h-4 mr-1" />
                  {city.temperature}
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setEditingCity(city);
                    setFormData({ name: city.name, country: city.country, continent: city.continent, rating: city.rating, reviews: city.reviews, temperature: city.temperature, attractions: city.attractions, budget: city.budget, status: city.status });
                    setIsEditModalOpen(true);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
                <button 
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this city?')) {
                      setCities(cities.filter(c => c.id !== city.id));
                    }
                  }}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit City Modal */}
      <Modal 
        isOpen={isAddModalOpen || isEditModalOpen} 
        onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} 
        title={editingCity ? 'Edit City' : 'Add New City'}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          if (editingCity) {
            setCities(cities.map(city => 
              city.id === editingCity.id 
                ? { ...city, ...formData }
                : city
            ));
            setIsEditModalOpen(false);
          } else {
            const newCity: City = {
              id: Math.max(...cities.map(c => c.id)) + 1,
              ...formData
            };
            setCities([...cities, newCity]);
            setIsAddModalOpen(false);
          }
          setFormData({ name: '', country: '', continent: 'Asia', rating: 4.5, reviews: 0, temperature: '', attractions: 0, budget: 'Medium', status: 'Active' });
        }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Continent</label>
            <select
              value={formData.continent}
              onChange={(e) => setFormData({ ...formData, continent: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {continents.filter(c => c !== 'All').map(continent => (
                <option key={continent} value={continent}>{continent}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperature Range</label>
              <input
                type="text"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="15°C - 25°C"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attractions</label>
              <input
                type="number"
                value={formData.attractions}
                onChange={(e) => setFormData({ ...formData, attractions: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget Level</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value as 'Low' | 'Medium' | 'High' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingCity ? 'Update' : 'Add'} City
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}