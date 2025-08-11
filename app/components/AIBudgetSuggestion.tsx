'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Sun, Cloud, Snowflake, Umbrella, Sparkles, Clock } from 'lucide-react';

interface BudgetBreakdown {
  accommodation: { amount: number; percentage: number; tips: string[] };
  food: { amount: number; percentage: number; tips: string[] };
  transportation: { amount: number; percentage: number; tips: string[] };
  activities: { amount: number; percentage: number; tips: string[] };
  miscellaneous: { amount: number; percentage: number; tips: string[] };
}

interface ItinerarySuggestion {
  day: number;
  date?: string;
  dayOfWeek?: string;
  locations: string[];
  activities: string[];
  estimatedCost: number;
  weatherTips?: string[];
  description: string;
}

interface SeasonalInfo {
  season: string;
  weather: string;
  festivals: string[];
  recommendedActivities: string[];
  tips: string[];
}

interface AIBudgetData {
  totalBudget: number;
  budgetBreakdown: BudgetBreakdown;
  itinerarySuggestions: ItinerarySuggestion[];
  localTips: string[];
  seasonalInfo?: SeasonalInfo;
  tripDuration?: string;
}

export default function AIBudgetSuggestion({ tripId }: { tripId: string }) {
  const [suggestion, setSuggestion] = useState<AIBudgetData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSuggestion = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/ai/budget-suggestion/${tripId}`);
      const data = await response.json();
      setSuggestion(data);
    } catch (error) {
      console.error('Failed to fetch AI suggestion:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather?.toLowerCase()) {
      case 'hot': return <Sun className="w-5 h-5 text-orange-500" />;
      case 'rainy': return <Umbrella className="w-5 h-5 text-blue-500" />;
      case 'cold': return <Snowflake className="w-5 h-5 text-blue-300" />;
      case 'pleasant': case 'cool': return <Cloud className="w-5 h-5 text-gray-500" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800">AI Travel Assistant</h3>
          <p className="text-gray-600">Personalized itinerary & budget planning</p>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {!suggestion ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchSuggestion}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Get AI Travel Plan
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Seasonal Information */}
            {suggestion.seasonalInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  {getWeatherIcon(suggestion.seasonalInfo.weather)}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 capitalize">
                      {suggestion.seasonalInfo.season} Season Travel
                    </h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {suggestion.seasonalInfo.weather} weather conditions
                    </p>
                  </div>
                </div>
                
                {suggestion.seasonalInfo.festivals.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">🎉 Festival Season:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.seasonalInfo.festivals.map((festival, i) => (
                        <span key={i} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                          {festival}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">🎯 Perfect For:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestion.seasonalInfo.recommendedActivities.map((activity, i) => (
                        <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">💡 Season Tips:</p>
                    <ul className="text-xs space-y-1">
                      {suggestion.seasonalInfo.tips.slice(0, 2).map((tip: string, i: number) => (
                        <li key={i} className="text-gray-600">• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Budget Breakdown */}
            <div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                💰 Smart Budget Breakdown
                {suggestion.tripDuration && (
                  <span className="text-sm font-normal text-gray-600">({suggestion.tripDuration})</span>
                )}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(suggestion.budgetBreakdown).map(([category, data], index) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <h5 className="font-semibold capitalize text-slate-700 mb-2">{category}</h5>
                    <p className="text-2xl font-bold text-slate-900 mb-1">₹{data.amount.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-500 mb-3">{data.percentage}% of total budget</p>
                    <div className="space-y-1">
                      {data.tips.slice(0, 2).map((tip, i) => (
                        <p key={i} className="text-xs text-green-700 bg-green-50 p-2 rounded">💡 {tip}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Your Personalized Itinerary
              </h4>
              <div className="space-y-4">
                {suggestion.itinerarySuggestions.map((day, index) => (
                  <motion.div 
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                            {day.day}
                          </div>
                          <div>
                            <h5 className="font-semibold text-lg">Day {day.day}</h5>
                            {day.date && (
                              <p className="text-sm opacity-90 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDate(day.date)} ({day.dayOfWeek})
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm opacity-90">Daily Budget</p>
                          <p className="font-bold">₹{day.estimatedCost.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <p className="text-gray-700 mb-4 italic leading-relaxed">{day.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> Locations to Visit
                          </p>
                          <div className="space-y-1">
                            {day.locations.map((location, i) => (
                              <span key={i} className="inline-block bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-1">
                                {location}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                            🎯 Planned Activities
                          </p>
                          <div className="space-y-1">
                            {day.activities.map((activity, i) => (
                              <span key={i} className="inline-block bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-1">
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {day.weatherTips && day.weatherTips.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-sm font-medium text-yellow-800 mb-1">🌤️ Weather Tips:</p>
                          <ul className="text-xs text-yellow-700 space-y-1">
                            {day.weatherTips.map((tip, i) => (
                              <li key={i}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Local Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200"
            >
              <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                🏆 Expert Local Tips
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestion.localTips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-3 rounded-lg shadow-sm border border-amber-100"
                  >
                    <p className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">✨</span>
                      {tip}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}