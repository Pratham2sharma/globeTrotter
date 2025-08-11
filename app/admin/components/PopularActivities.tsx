import React from "react";
import { motion } from "framer-motion";

interface PopularActivitiesProps {
  search: string;
  sort: string;
}

const PopularActivities: React.FC<PopularActivitiesProps> = ({
  search,
  sort,
}) => {
  const dummyActivities = [
    {
      id: 1,
      name: "Wine Tasting Tour",
      category: "Food & Wine",
      bookings: 234,
      rating: 4.8,
      trend: "up",
    },
    {
      id: 2,
      name: "Scuba Diving",
      category: "Adventure",
      bookings: 189,
      rating: 4.9,
      trend: "up",
    },
    {
      id: 3,
      name: "Cultural Walking Tour",
      category: "Culture",
      bookings: 156,
      rating: 4.7,
      trend: "steady",
    },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-emerald-500";
      case "down":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      default:
        return "→";
    }
  };

  return (
    <motion.section
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 border-b border-gray-200/50">
        <h2 className="text-2xl font-semibold text-slate-900">
          Popular Activities
        </h2>
        <p className="text-gray-600 mt-1">Most booked experiences</p>
      </div>

      <div className="p-6">
        <div className="grid gap-6">
          {dummyActivities.map((activity) => (
            <motion.div
              key={activity.id}
              className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{
                y: -2,
                backgroundColor: "rgba(249, 250, 251, 0.8)",
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-slate-900">
                    {activity.name}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-1">
                    {activity.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <span className={getTrendColor(activity.trend)}>
                      {getTrendIcon(activity.trend)}
                    </span>
                    <span className="text-gray-900 font-medium">
                      {activity.bookings}
                    </span>
                    <span className="text-gray-500 text-sm">bookings</span>
                  </div>
                  <div className="flex items-center justify-end space-x-1 text-yellow-500 mt-1">
                    {"★".repeat(Math.floor(activity.rating))}
                    <span className="text-gray-600 text-sm ml-1">
                      {activity.rating}
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-4 w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="h-full bg-teal-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(activity.bookings / 300) * 100}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
        <p className="text-sm text-gray-500">
          Showing {dummyActivities.length} activities • Filtered by: {search} •
          Sorted by: {sort}
        </p>
      </div>
    </motion.section>
  );
};

export default PopularActivities;
