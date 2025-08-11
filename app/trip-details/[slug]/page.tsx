"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Star, MapPin, Calendar } from "lucide-react";
import Image from "next/image";

export default function TripDetails({ params }: { params: { slug: string } }) {
  const tripData = {
    "rajasthan-palace-heritage": {
      name: "Rajasthan Palace Heritage",
      location: "Jaipur, Udaipur, Jodhpur",
      duration: "8 days",
      rating: 4.9,
      reviews: 127,
      price: "₹89,999",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
      description: "Experience the royal heritage of Rajasthan with stays in magnificent palaces."
    }
  };

  const trip = tripData[params.slug as keyof typeof tripData] || tripData["rajasthan-palace-heritage"];

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <motion.a
            href="/"
            whileHover={{ x: -5 }}
            className="inline-flex items-center space-x-2 text-teal-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96"
      >
        <Image src={trip.image} alt={trip.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl font-bold mb-4">{trip.name}</h1>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-5 h-5" />
                <span>{trip.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-5 h-5" />
                <span>{trip.duration}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{trip.name}</h2>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(trip.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2 text-gray-600">({trip.reviews} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">{trip.price}</div>
              <div className="text-sm text-gray-600">per person</div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8">{trip.description}</p>
          
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold"
            >
              Book Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex-1 border border-teal-600 text-teal-600 py-3 rounded-lg font-semibold"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}