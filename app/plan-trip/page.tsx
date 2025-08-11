"use client"

// ============================================================================
// IMPORTS - External dependencies and Next.js utilities
// ============================================================================
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Users, DollarSign, Plane, Clock, Star, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import ValidationToast from '../../components/ValidationToast';
import { validateDestination, validateTripDuration, validateTravelers, getDateValidation } from '../../lib/validation';

// ============================================================================
// TYPE DEFINITIONS - Interface definitions for type safety
// ============================================================================

// Main trip data structure - stores all user selections
interface TripData {
  destination: string;    // Selected destination name
  startDate: string;      // Trip start date (ISO format)
  endDate: string;        // Trip end date (ISO format)
  travelers: number;      // Number of travelers
  budget: string;         // Selected budget range
  travelStyle: string;    // Selected travel style ID
  interests: string[];    // Array of selected interests
}

// Destination option structure for popular destinations
interface Destination {
  name: string;           // Destination name
  country: string;        // Country name
  image: string;          // Emoji or image representation
  rating: number;         // Average user rating (1-5)
  description: string;    // Brief description
}

// ============================================================================
// MAIN COMPONENT - Multi-step trip planning wizard
// ============================================================================
export default function PlanTrip() {
  // ============================================================================
  // HOOKS AND STATE MANAGEMENT
  // ============================================================================
  
  const router = useRouter();                    // Next.js router for navigation
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1); // Current wizard step (1-4)
  
  // Main trip data state - accumulates user selections across steps
  const [tripData, setTripData] = useState<TripData>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,          // Default to 1 traveler
    budget: '',
    travelStyle: '',
    interests: []          // Empty array for multi-select interests
  });
  
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' as 'error' | 'success' });

  // Handle URL parameters for pre-filled destination
  useEffect(() => {
    const destination = searchParams.get('destination');
    if (destination) {
      setTripData(prev => ({ ...prev, destination: decodeURIComponent(destination) }));
    }
  }, [searchParams]);

  // ============================================================================
  // STATIC DATA - Configuration data for form options
  // ============================================================================
  
  // Popular destination options with ratings and descriptions
  const popularDestinations: Destination[] = [
    { name: 'Paris', country: 'France', image: '🇫🇷', rating: 4.8, description: 'City of lights and romance' },
    { name: 'Tokyo', country: 'Japan', image: '🇯🇵', rating: 4.9, description: 'Modern culture meets tradition' },
    { name: 'Bali', country: 'Indonesia', image: '🇮🇩', rating: 4.7, description: 'Tropical paradise and culture' },
    { name: 'New York', country: 'USA', image: '🇺🇸', rating: 4.6, description: 'The city that never sleeps' },
    { name: 'Dubai', country: 'UAE', image: '🇦🇪', rating: 4.8, description: 'Luxury and modern architecture' },
    { name: 'London', country: 'UK', image: '🇬🇧', rating: 4.7, description: 'History, culture, and royalty' }
  ];

  // Travel style options with unique IDs, names, icons, and descriptions
  const travelStyles = [
    { id: 'luxury', name: 'Luxury', icon: '✨', description: 'Premium experiences and accommodations' },
    { id: 'adventure', name: 'Adventure', icon: '🏔️', description: 'Thrilling activities and exploration' },
    { id: 'cultural', name: 'Cultural', icon: '🏛️', description: 'Museums, history, and local traditions' },
    { id: 'relaxation', name: 'Relaxation', icon: '🏖️', description: 'Peaceful and rejuvenating experiences' },
    { id: 'budget', name: 'Budget-Friendly', icon: '💰', description: 'Great value without compromising fun' },
    { id: 'family', name: 'Family', icon: '👨👩👧👦', description: 'Kid-friendly activities and accommodations' }
  ];

  // Interest categories for personalized recommendations
  const interests = [
    'Food & Dining', 'Museums & Art', 'Nightlife', 'Shopping', 'Nature & Parks',
    'Architecture', 'Photography', 'Local Markets', 'Beaches', 'Adventure Sports',
    'Historical Sites', 'Music & Entertainment'
  ];

  // Budget range options in Indian Rupees
  const budgetRanges = [
    '₹50,000 - ₹1,00,000',      // Budget travel
    '₹1,00,000 - ₹2,00,000',    // Mid-range travel
    '₹2,00,000 - ₹3,00,000',    // Premium travel
    '₹3,00,000 - ₹5,00,000',    // Luxury travel
    '₹5,00,000+'                // Ultra-luxury travel
  ];

  // ============================================================================
  // EVENT HANDLERS - Functions that handle user interactions
  // ============================================================================
  
  // Advances to next step in wizard (max 3 steps)
  const handleNext = () => {
    if (!isStepValid()) return;
    
    if (currentStep === 2) {
      const durationValidation = validateTripDuration(tripData.startDate, tripData.endDate);
      if (!durationValidation.isValid) {
        setToast({ show: true, message: durationValidation.message!, type: 'error' });
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Goes back to previous step in wizard (min step 1)
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Updates selected destination in trip data
  const handleDestinationSelect = (destination: string) => {
    setTripData({ ...tripData, destination });
  };

  // Updates selected travel style in trip data
  const handleTravelStyleSelect = (style: string) => {
    setTripData({ ...tripData, travelStyle: style });
  };

  // Toggles interest selection (add/remove from array)
  const handleInterestToggle = (interest: string) => {
    const updatedInterests = tripData.interests.includes(interest)
      ? tripData.interests.filter(i => i !== interest)  // Remove if already selected
      : [...tripData.interests, interest];              // Add if not selected
    setTripData({ ...tripData, interests: updatedInterests });
  };

  // Submits completed trip data and navigates to profile
  const handleSubmit = () => {
    // Save trip data to localStorage for demo purposes
    const existingTrips = JSON.parse(localStorage.getItem('userTrips') || '[]');
    const newTrip = {
      id: Date.now(),
      ...tripData,
      status: 'planned',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('userTrips', JSON.stringify([...existingTrips, newTrip]));
    
    console.log('Trip created:', newTrip);
    router.push('/userprofile');
  };

  // ============================================================================
  // VALIDATION LOGIC - Checks if current step has required data
  // ============================================================================
  
  // Validates current step to enable/disable Next button
  const isStepValid = () => {
    switch (currentStep) {
      case 1:  // Step 1: Destination required
        return tripData.destination !== '';
      case 2:  // Step 2: Dates and travelers required
        return tripData.startDate !== '' && tripData.endDate !== '' && tripData.travelers > 0;
      case 3:  // Step 3: Budget and travel style required
        return tripData.budget !== '' && tripData.travelStyle !== '';
      default:
        return false;
    }
  };

  // ============================================================================
  // STEP RENDERING LOGIC - Renders appropriate step content
  // ============================================================================
  
  // Returns JSX for current step based on currentStep state
  const renderStep = () => {
    switch (currentStep) {
      // STEP 1: Destination Selection
      case 1:
        return (
          <div className="space-y-6">
            {/* Step header with title and description */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Where would you like to go?</h2>
              <p className="text-gray-600">Choose your dream destination</p>
            </div>
            
            <div className="space-y-4">
              {/* Free text input for custom destinations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search or enter destination
                </label>
                <input
                  type="text"
                  value={tripData.destination}
                  onChange={(e) => setTripData({ ...tripData, destination: e.target.value })}
                  placeholder="e.g., Paris, Tokyo, Bali..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>

              {/* Popular destinations grid */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Popular Destinations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {popularDestinations.map((dest, index) => (
                    /* Individual destination card with selection state */
                    <div
                      key={index}
                      onClick={() => handleDestinationSelect(dest.name)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        tripData.destination === dest.name
                          ? 'border-teal-400 bg-teal-50'      // Selected state styling
                          : 'border-gray-200 hover:border-gray-300' // Default state styling
                      }`}
                    >
                      {/* Destination card content */}
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{dest.image}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{dest.name}</h4>
                          <p className="text-sm text-gray-600">{dest.country}</p>
                          {/* Rating display with star icon */}
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <span className="text-sm text-gray-600 ml-1">{dest.rating}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{dest.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      // STEP 2: Date and Traveler Selection
      case 2:
        return (
          <div className="space-y-6">
            {/* Step header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">When are you traveling?</h2>
              <p className="text-gray-600">Select your travel dates and group size</p>
            </div>

            {/* Date selection grid - responsive layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Start date input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={tripData.startDate}
                  onChange={(e) => setTripData({ ...tripData, startDate: e.target.value })}
                  min={getDateValidation().min}
                  max={getDateValidation().max}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>

              {/* End date input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  End Date
                </label>
                <input
                  type="date"
                  value={tripData.endDate}
                  onChange={(e) => setTripData({ ...tripData, endDate: e.target.value })}
                  min={tripData.startDate || getDateValidation().min}
                  max={tripData.startDate ? 
                    new Date(new Date(tripData.startDate).getTime() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] :
                    getDateValidation().max
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Traveler count selector with increment/decrement buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Number of Travelers
              </label>
              <div className="flex items-center space-x-4">
                {/* Decrement button (minimum 1 traveler) */}
                <button
                  type="button"
                  onClick={() => setTripData({ ...tripData, travelers: Math.max(1, tripData.travelers - 1) })}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                {/* Current traveler count display */}
                <span className="text-xl font-semibold text-slate-900 w-8 text-center">
                  {tripData.travelers}
                </span>
                {/* Increment button */}
                <button
                  type="button"
                  onClick={() => {
                    if (tripData.travelers >= 20) {
                      setToast({ show: true, message: 'Maximum 20 travelers allowed per booking', type: 'error' });
                      return;
                    }
                    setTripData({ ...tripData, travelers: tripData.travelers + 1 });
                  }}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Budget & Travel Style</h2>
              <p className="text-gray-600">Help us customize your perfect trip</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Budget Range
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budgetRanges.map((range, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setTripData({ ...tripData, budget: range })}
                    className={`p-3 text-left border rounded-lg transition-all ${
                      tripData.budget === range
                        ? 'border-teal-400 bg-teal-50 text-teal-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Travel Style
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {travelStyles.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => handleTravelStyleSelect(style.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      tripData.travelStyle === style.id
                        ? 'border-teal-400 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{style.icon}</span>
                      <h4 className="font-semibold text-slate-900">{style.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{style.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trip Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-2">Trip Summary</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Destination:</span> {tripData.destination}</p>
                <p><span className="font-medium">Dates:</span> {tripData.startDate} to {tripData.endDate}</p>
                <p><span className="font-medium">Travelers:</span> {tripData.travelers}</p>
                <p><span className="font-medium">Budget:</span> {tripData.budget}</p>
                <p><span className="font-medium">Style:</span> {travelStyles.find(s => s.id === tripData.travelStyle)?.name}</p>
              </div>
            </div>
          </div>
        );



      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-900 px-4 sm:px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <Plane className="w-6 h-6 text-yellow-400" />
            <h1 className="text-xl font-bold text-white">Plan New Trip</h1>
          </div>
          
          <div className="w-16" />
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  isStepValid()
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  isStepValid()
                    ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-300'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Create Trip</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <ValidationToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
}