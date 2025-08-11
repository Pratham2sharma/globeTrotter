import React from "react";
import { motion } from "framer-motion";

interface PopularCitiesProps {
  search: string;
  sort: string;
}

const PopularCities: React.FC<PopularCitiesProps> = ({ search, sort }) => {
  const dummyCities = [
    { id: 1, name: "Paris", country: "France", visits: 15420, rating: 4.8 },
    { id: 2, name: "Tokyo", country: "Japan", visits: 12350, rating: 4.9 },
    { id: 3, name: "New York", country: "USA", visits: 11890, rating: 4.7 },
  ];

  return (
    <motion.section
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 border-b border-gray-200/50">
        <h2 className="text-2xl font-semibold text-slate-900">
          Popular Cities
        </h2>
        <p className="text-gray-600 mt-1">Most visited destinations</p>
      </div>

      <div className="p-6">
        <div className="grid gap-6">
          {dummyCities.map((city) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50"
              whileHover={{
                y: -2,
                backgroundColor: "rgba(249, 250, 251, 0.8)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-slate-900">
                    {city.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{city.country}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    {"★".repeat(Math.floor(city.rating))}
                    <span className="text-gray-600 text-sm ml-1">
                      {city.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {city.visits.toLocaleString()} visits
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-teal-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(city.visits / 16000) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
        <p className="text-sm text-gray-500">
          Showing {dummyCities.length} cities • Filtered by: {search} • Sorted
          by: {sort}
        </p>
      </div>
    </motion.section>
  );
};

export default PopularCities;
