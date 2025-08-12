"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Sun,
  Cloud,
  Snowflake,
  Umbrella,
  Sparkles,
  Clock,
  Download,
} from "lucide-react";
import dynamic from "next/dynamic";

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
  const [exporting, setExporting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchSuggestion = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/ai/budget-suggestion/${tripId}`);
      const data = await response.json();
      setSuggestion(data);
    } catch (error) {
      console.error("Failed to fetch AI suggestion:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather?.toLowerCase()) {
      case "hot":
        return <Sun className="w-5 h-5 text-orange-500" />;
      case "rainy":
        return <Umbrella className="w-5 h-5 text-blue-500" />;
      case "cold":
        return <Snowflake className="w-5 h-5 text-blue-300" />;
      case "pleasant":
      case "cool":
        return <Cloud className="w-5 h-5 text-gray-500" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const exportToPDF = async () => {
    if (!suggestion) return;

    setExporting(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const pdf = new jsPDF("p", "mm", "a4");
      let yPosition = 25;
      const pageWidth = pdf.internal.pageSize.width;
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;

      // Header with background
      pdf.setFillColor(20, 184, 166);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      // Title
      pdf.setFontSize(22);
      pdf.setTextColor(255, 255, 255);
      pdf.text('GlobeTrotter', margin, 20);
      
      // Subtitle
      pdf.setFontSize(12);
      pdf.text('AI-Powered Travel Itinerary', margin, 30);
      
      yPosition = 50;

      // Destination info
      pdf.setFillColor(248, 250, 252);
      pdf.rect(margin, yPosition - 5, contentWidth, 25, 'F');
      
      pdf.setFontSize(16);
      pdf.setTextColor(51, 65, 85);
      pdf.text(`Destination: ${suggestion.destination || 'Your Dream Destination'}`, margin + 5, yPosition + 5);
      
      if (suggestion.tripDuration) {
        pdf.text(`Duration: ${suggestion.tripDuration}`, margin + 5, yPosition + 15);
      }
      yPosition += 35;

      // Budget Breakdown Section
      pdf.setFontSize(18);
      pdf.setTextColor(20, 184, 166);
      pdf.text('Budget Breakdown', margin, yPosition);
      yPosition += 15;

      // Calculate total budget
      const totalBudget = Object.values(suggestion.budgetBreakdown).reduce((sum, data) => sum + data.amount, 0);
      
      pdf.setFontSize(14);
      pdf.setTextColor(51, 65, 85);
      pdf.text(`Total Budget: INR ${totalBudget.toLocaleString('en-IN')}`, margin, yPosition);
      yPosition += 15;

      Object.entries(suggestion.budgetBreakdown).forEach(([category, data]) => {
        // Category box
        pdf.setFillColor(255, 255, 255);
        pdf.setDrawColor(229, 231, 235);
        pdf.rect(margin, yPosition - 3, contentWidth, 20, 'FD');
        
        pdf.setFontSize(12);
        pdf.setTextColor(51, 65, 85);
        pdf.text(`${category.toUpperCase()}`, margin + 5, yPosition + 5);
        
        pdf.setFontSize(14);
        pdf.setTextColor(20, 184, 166);
        pdf.text(`INR ${data.amount.toLocaleString('en-IN')}`, margin + 5, yPosition + 12);
        
        pdf.setFontSize(10);
        pdf.setTextColor(100, 116, 139);
        pdf.text(`${data.percentage}% of total`, pageWidth - margin - 40, yPosition + 8);
        
        yPosition += 25;
        
        // Add top tips
        pdf.setFontSize(9);
        pdf.setTextColor(34, 197, 94);
        data.tips.slice(0, 2).forEach(tip => {
          const lines = pdf.splitTextToSize(`Tip: ${tip}`, contentWidth - 10);
          pdf.text(lines, margin + 5, yPosition);
          yPosition += lines.length * 3.5;
        });
        yPosition += 8;
      });

      // Check for new page
      if (yPosition > 220) {
        pdf.addPage();
        yPosition = 25;
      }

      // Itinerary Section
      pdf.setFontSize(18);
      pdf.setTextColor(20, 184, 166);
      pdf.text('Day-by-Day Itinerary', margin, yPosition);
      yPosition += 15;

      suggestion.itinerarySuggestions.forEach((day, index) => {
        // Check if we need a new page
        if (yPosition > 220) {
          pdf.addPage();
          yPosition = 25;
        }

        // Day header with background
        pdf.setFillColor(20, 184, 166);
        pdf.rect(margin, yPosition - 3, contentWidth, 15, 'F');
        
        pdf.setFontSize(14);
        pdf.setTextColor(255, 255, 255);
        pdf.text(`Day ${day.day}`, margin + 5, yPosition + 7);
        
        pdf.setTextColor(255, 255, 255);
        pdf.text(`Daily Budget: INR ${day.estimatedCost.toLocaleString('en-IN')}`, pageWidth - margin - 60, yPosition + 7);
        
        yPosition += 20;

        // Description
        pdf.setFontSize(10);
        pdf.setTextColor(51, 65, 85);
        const descLines = pdf.splitTextToSize(day.description, contentWidth);
        pdf.text(descLines, margin + 5, yPosition);
        yPosition += descLines.length * 4 + 8;

        // Locations section
        pdf.setFontSize(11);
        pdf.setTextColor(59, 130, 246);
        pdf.text('Locations:', margin + 5, yPosition);
        yPosition += 6;
        
        pdf.setFontSize(9);
        pdf.setTextColor(75, 85, 99);
        const locationText = day.locations.join(' | ');
        const locationLines = pdf.splitTextToSize(locationText, contentWidth - 10);
        pdf.text(locationLines, margin + 10, yPosition);
        yPosition += locationLines.length * 3.5 + 5;

        // Activities section
        pdf.setFontSize(11);
        pdf.setTextColor(34, 197, 94);
        pdf.text('Activities:', margin + 5, yPosition);
        yPosition += 6;
        
        pdf.setFontSize(9);
        pdf.setTextColor(75, 85, 99);
        const activityText = day.activities.join(' | ');
        const activityLines = pdf.splitTextToSize(activityText, contentWidth - 10);
        pdf.text(activityLines, margin + 10, yPosition);
        yPosition += activityLines.length * 3.5 + 15;
      });

      // Local Tips Section
      if (yPosition > 200) {
        pdf.addPage();
        yPosition = 25;
      }

      pdf.setFontSize(18);
      pdf.setTextColor(20, 184, 166);
      pdf.text('Expert Local Tips', margin, yPosition);
      yPosition += 15;

      suggestion.localTips.forEach((tip, index) => {
        if (yPosition > 260) {
          pdf.addPage();
          yPosition = 25;
        }
        
        // Tip box
        pdf.setFillColor(254, 243, 199);
        pdf.setDrawColor(245, 158, 11);
        pdf.rect(margin, yPosition - 3, contentWidth, 12, 'FD');
        
        pdf.setFontSize(10);
        pdf.setTextColor(146, 64, 14);
        const tipLines = pdf.splitTextToSize(`${index + 1}. ${tip}`, contentWidth - 10);
        pdf.text(tipLines, margin + 5, yPosition + 4);
        yPosition += Math.max(12, tipLines.length * 4) + 5;
      });

      // Footer
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(156, 163, 175);
        pdf.text(`Generated by GlobeTrotter - Page ${i} of ${pageCount}`, margin, pdf.internal.pageSize.height - 10);
        pdf.text(new Date().toLocaleDateString('en-IN'), pageWidth - margin - 30, pdf.internal.pageSize.height - 10);
      }

      pdf.save(`GlobeTrotter-Travel-Itinerary-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert('PDF generation failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

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
          <h3 className="text-2xl font-bold text-slate-800">
            AI Travel Assistant
          </h3>
          <p className="text-gray-600">
            Personalized itinerary & budget planning
          </p>
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
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
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
        ) : suggestion && mounted ? (
          <div>
            <div className="flex justify-end mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToPDF}
                disabled={exporting}
                className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                {exporting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Export as PDF
                  </>
                )}
              </motion.button>
            </div>
            <div
              ref={pdfRef}
              className="pdf-content"
              style={{ minHeight: "100px" }}
            >
              <div className="bg-white p-8 rounded-2xl">
                {/* PDF Header */}
                <div className="text-center mb-8 border-b-2 border-teal-500 pb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                      GlobeTrotter
                    </h1>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    AI-Powered Travel Itinerary
                  </h2>
                  <p className="text-gray-600">
                    Personalized travel plan generated on{" "}
                    {mounted
                      ? new Date().toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </p>
                </div>
                <div className="space-y-8">
                  {/* Seasonal Information */}
                  {suggestion.seasonalInfo && (
                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200">
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
                          <p className="text-sm font-medium text-slate-700 mb-2">
                            🎉 Festival Season:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.seasonalInfo.festivals.map(
                              (festival, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium"
                                >
                                  {festival}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">
                            🎯 Perfect For:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {suggestion.seasonalInfo.recommendedActivities.map(
                              (activity, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                                >
                                  {activity}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">
                            💡 Season Tips:
                          </p>
                          <ul className="text-xs space-y-1">
                            {suggestion.seasonalInfo.tips
                              .slice(0, 2)
                              .map((tip: string, i: number) => (
                                <li key={i} className="text-gray-600">
                                  • {tip}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Budget Breakdown */}
                  <div>
                    <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      💰 Smart Budget Breakdown
                      {suggestion.tripDuration && (
                        <span className="text-sm font-normal text-gray-600">
                          ({suggestion.tripDuration})
                        </span>
                      )}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(suggestion.budgetBreakdown).map(
                        ([category, data], index) => (
                          <div
                            key={category}
                            className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                          >
                            <h5 className="font-semibold capitalize text-slate-700 mb-2">
                              {category}
                            </h5>
                            <p className="text-2xl font-bold text-slate-900 mb-1">
                              ₹{data.amount.toLocaleString("en-IN")}
                            </p>
                            <p className="text-sm text-gray-500 mb-3">
                              {data.percentage}% of total budget
                            </p>
                            <div className="space-y-1">
                              {data.tips.slice(0, 2).map((tip, i) => (
                                <p
                                  key={i}
                                  className="text-xs text-green-700 bg-green-50 p-2 rounded"
                                >
                                  💡 {tip}
                                </p>
                              ))}
                            </div>
                          </div>
                        )
                      )}
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
                        <div
                          key={day.day}
                          className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 print:bg-teal-600">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                                  {day.day}
                                </div>
                                <div>
                                  <h5 className="font-semibold text-lg">
                                    Day {day.day}
                                  </h5>
                                  {day.date && (
                                    <p className="text-sm opacity-90 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {formatDate(day.date)} ({day.dayOfWeek})
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm opacity-90">
                                  Daily Budget
                                </p>
                                <p className="font-bold">
                                  ₹{day.estimatedCost.toLocaleString("en-IN")}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-5">
                            <p className="text-gray-700 mb-4 italic leading-relaxed">
                              {day.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1">
                                  <MapPin className="w-4 h-4" /> Locations to
                                  Visit
                                </p>
                                <div className="space-y-1">
                                  {day.locations.map((location, i) => (
                                    <span
                                      key={i}
                                      className="inline-block bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-1"
                                    >
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
                                    <span
                                      key={i}
                                      className="inline-block bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-1"
                                    >
                                      {activity}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Local Tips */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      🏆 Expert Local Tips
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {suggestion.localTips.map((tip, i) => (
                        <div
                          key={i}
                          className="bg-white p-3 rounded-lg shadow-sm border border-amber-100"
                        >
                          <p className="text-sm text-slate-700 flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">✨</span>
                            {tip}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
