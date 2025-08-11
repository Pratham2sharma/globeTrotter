"use client"

import React from 'react';
import { Users, MapPin, Activity, BarChart3, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  const stats = [
    { title: 'Total Users', value: '2,847', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Trips', value: '1,234', icon: MapPin, color: 'bg-green-500' },
    { title: 'Activities', value: '567', icon: Activity, color: 'bg-purple-500' },
    { title: 'Cities', value: '89', icon: BarChart3, color: 'bg-orange-500' }
  ];

  const menuItems = [
    { title: 'Users', path: '/admin/users', icon: Users },
    { title: 'Trips', path: '/admin/trips', icon: MapPin },
    { title: 'Activities', path: '/admin/activities', icon: Activity },
    { title: 'Cities', path: '/admin/cities', icon: BarChart3 },
    { title: 'User Trends', path: '/admin/trends', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Exit Admin
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className="bg-white rounded-lg shadow-sm p-6 border hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center">
                <item.icon className="w-8 h-8 text-gray-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">Manage {item.title.toLowerCase()}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}