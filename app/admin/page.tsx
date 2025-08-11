"use client"

import React, { useState, useEffect } from 'react';
import { Users, MapPin, Activity, BarChart3, Settings, LogOut, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminStats {
  totalUsers: number;
  activeTrips: number;
  activities: number;
  cities: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string>('');

  useEffect(() => {
    fetchAdminStats();
    fetchAdminProfile();
  }, []);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/stats', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        setError('Failed to fetch admin statistics');
      }
    } catch (err) {
      setError('Error loading admin data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminProfile = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setAdminName(`${data.user.fname} ${data.user.lname}`);
      }
    } catch (err) {
      console.error('Error fetching admin profile:', err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
      router.push('/login');
    }
  };

  const statsConfig = [
    { title: 'Total Users', key: 'totalUsers' as keyof AdminStats, icon: Users, color: 'bg-blue-500' },
    { title: 'Active Trips', key: 'activeTrips' as keyof AdminStats, icon: MapPin, color: 'bg-green-500' },
    { title: 'Activities', key: 'activities' as keyof AdminStats, icon: Activity, color: 'bg-purple-500' },
    { title: 'Cities', key: 'cities' as keyof AdminStats, icon: BarChart3, color: 'bg-orange-500' }
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              {adminName && <p className="text-sm text-gray-600">Welcome, {adminName}</p>}
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {loading ? (
            // Loading state
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center">
                  <div className="bg-gray-200 p-3 rounded-lg animate-pulse">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={fetchAdminStats}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : !stats ? (
            // No data state
            <div className="col-span-full bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-600">No data to show</p>
            </div>
          ) : (
            // Data loaded state
            statsConfig.map((statConfig, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center">
                  <div className={`${statConfig.color} p-3 rounded-lg`}>
                    <statConfig.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{statConfig.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats[statConfig.key] || 0}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
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