import React from "react";
import { motion } from "framer-motion";

interface UserTrendsProps {
  search: string;
  sort: string;
}

const UserTrends: React.FC<UserTrendsProps> = ({ search, sort }) => {
  const dummyTrends = [
    {
      id: 1,
      metric: "New Users",
      value: 1234,
      change: "+12.5%",
      trend: "up",
      period: "This Month",
    },
    {
      id: 2,
      metric: "Active Users",
      value: 8765,
      change: "+8.2%",
      trend: "up",
      period: "This Month",
    },
    {
      id: 3,
      metric: "Bookings",
      value: 567,
      change: "-2.1%",
      trend: "down",
      period: "This Month",
    },
  ];

  return (
    <motion.section
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 border-b border-gray-200/50">
        <h2 className="text-2xl font-semibold text-slate-900">User Trends</h2>
        <p className="text-gray-600 mt-1">Platform analytics and metrics</p>
      </div>

      <div className="p-6">
        <div className="grid gap-6">
          {dummyTrends.map((trend) => (
            <motion.div
              key={trend.id}
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
                  <p className="text-sm text-gray-500">{trend.metric}</p>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <h3 className="text-2xl font-semibold text-slate-900">
                      {trend.value.toLocaleString()}
                    </h3>
                    <span
                      className={`text-sm font-medium ${
                        trend.trend === "up"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {trend.change}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <motion.div
                    className={`text-2xl ${
                      trend.trend === "up" ? "text-emerald-500" : "text-red-500"
                    }`}
                    animate={{
                      y: trend.trend === "up" ? [-2, 0, -2] : [2, 0, 2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {trend.trend === "up" ? "↑" : "↓"}
                  </motion.div>
                  <p className="text-sm text-gray-500 mt-1">{trend.period}</p>
                </div>
              </div>

              <motion.div
                className="mt-4 w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className={`h-full rounded-full ${
                    trend.trend === "up" ? "bg-emerald-500" : "bg-red-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      trend.trend === "up"
                        ? (trend.value / 10000) * 100
                        : 100 - (trend.value / 10000) * 100
                    }%`,
                  }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
        <p className="text-sm text-gray-500">
          Showing {dummyTrends.length} metrics • Period: This Month • Updated:
          Just now
        </p>
      </div>
    </motion.section>
  );
};

export default UserTrends;
