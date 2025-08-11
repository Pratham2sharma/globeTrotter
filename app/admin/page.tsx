"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ManageUsers from "./components/ManageUsers";
import PopularCities from "./components/PopularCities";
import PopularActivities from "./components/PopularActivities";
import UserTrends from "./components/UserTrends";

const AdminPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <motion.main
        className="admin-dashboard max-w-7xl mx-auto px-4 sm:px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-light mb-2">
            Admin
            <span className="font-bold bg-gradient-to-r from-teal-600 to-yellow-500 bg-clip-text text-transparent ml-2">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600">
            Manage your platform&apos;s content and monitor trends
          </p>
        </motion.div>

        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-gray-200/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <motion.input
                type="text"
                placeholder="Search by name, location, or activity..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-4 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all bg-white/50"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
            <motion.select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:w-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all bg-white/50"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="all">All Sections</option>
              <option value="users">Users</option>
              <option value="cities">Cities</option>
              <option value="activities">Activities</option>
              <option value="trends">Trends</option>
            </motion.select>
            <motion.select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full md:w-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all bg-white/50"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="popularity">Sort by Popularity</option>
            </motion.select>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {(filter === "all" || filter === "users") && (
              <motion.div variants={fadeInUp}>
                <ManageUsers search={search} sort={sort} />
              </motion.div>
            )}
            {(filter === "all" || filter === "cities") && (
              <motion.div variants={fadeInUp}>
                <PopularCities search={search} sort={sort} />
              </motion.div>
            )}
            {(filter === "all" || filter === "activities") && (
              <motion.div variants={fadeInUp}>
                <PopularActivities search={search} sort={sort} />
              </motion.div>
            )}
            {(filter === "all" || filter === "trends") && (
              <motion.div variants={fadeInUp}>
                <UserTrends search={search} sort={sort} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.button
          className="fixed bottom-8 right-8 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          Add New +
        </motion.button>
      </motion.main>
    </div>
  );
};

export default AdminPage;
