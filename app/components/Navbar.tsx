"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "next/navigation";
import TripCalendar from "./TripCalendar";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const sophisticatedHover = {
    scale: 1.02,
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" as const }}
      style={{ opacity }}
      className="bg-slate-900/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-slate-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center space-x-4"
          >
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 360,
                boxShadow: "0 0 30px rgba(250, 204, 21, 0.5)",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              onClick={() => router.push("/")}
            >
              <span className="text-slate-900 font-bold text-lg">🌍</span>
            </motion.div>
            <div>
              <motion.h1
                whileHover={{
                  scale: 1.05,
                }}
                className="text-2xl font-bold text-white tracking-wide hover:bg-gradient-to-r hover:from-white hover:via-teal-400 hover:to-white hover:bg-clip-text hover:text-transparent transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/")}
              >
                GlobeTrotter
              </motion.h1>
              <p className="text-sm text-teal-300 font-light tracking-wider">
                Curated Luxury Experiences
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden md:flex items-center space-x-8"
          >
            <motion.a
              href="/city-search"
              whileHover={{
                y: -3,
                color: "#14b8a6",
                textShadow: "0 0 8px rgba(20, 184, 166, 0.5)",
              }}
              transition={{ duration: 0.3 }}
              className="text-gray-300 font-medium tracking-wide relative group"
            >
              Destinations
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-400 to-yellow-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
            <motion.a
              href="/activity-search"
              whileHover={{
                y: -3,
                color: "#14b8a6",
                textShadow: "0 0 8px rgba(20, 184, 166, 0.5)",
              }}
              transition={{ duration: 0.3 }}
              className="text-gray-300 font-medium tracking-wide relative group"
            >
              Activity Search
            </motion.a>

            {user && <TripCalendar userId={user.id} />}

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <motion.div
                    onClick={() =>
                      router.push(`/profile/${user.id || "current"}`)
                    }
                    whileHover={{ scale: 1.1 }}
                    className="cursor-pointer"
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover border-2 border-yellow-400"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                        <span className="text-slate-900 text-sm font-medium">
                          {user.name?.[0]}
                        </span>
                      </div>
                    )}
                  </motion.div>
                  <motion.button
                    onClick={() =>
                      router.push(`/profile/${user.id || "current"}`)
                    }
                    whileHover={{ y: -3, color: "#14b8a6" }}
                    className="text-gray-300 font-medium tracking-wide hover:text-yellow-400 transition-colors cursor-pointer"
                  >
                    {user.name}
                  </motion.button>
                </div>
                <motion.button
                  onClick={() => useAuthStore.getState().logout()}
                  whileHover={{ y: -3 }}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm text-white"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <>
                <motion.a
                  href="/login"
                  whileHover={{ y: -3, color: "#14b8a6" }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 font-medium tracking-wide px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Login
                </motion.a>
                <motion.a
                  href="/register"
                  whileHover={sophisticatedHover}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-3 rounded-full font-semibold shadow-lg"
                >
                  Sign Up
                </motion.a>
              </>
            )}
          </motion.div>

          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-white p-3 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </motion.svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
              className="md:hidden overflow-hidden bg-slate-800/95 backdrop-blur-xl border-t border-slate-700/50"
            >
              <div className="px-4 py-6 space-y-4">
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 10, color: "#14b8a6" }}
                  href="/city-search"
                  className="block text-gray-300 font-medium py-2"
                >
                  Destinations
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 10, color: "#14b8a6" }}
                  href="/activity-search"
                  className="block text-gray-300 font-medium py-2"
                >
                  Activity Search
                </motion.a>
                {user ? (
                  <>
                    <motion.a
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ x: 10, color: "#14b8a6" }}
                      href={`/profile/${user.id || "current"}`}
                      className="block text-gray-300 font-medium py-2"
                    >
                      Profile
                    </motion.a>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => useAuthStore.getState().logout()}
                      className="block bg-red-600 text-white px-4 py-3 rounded-full font-semibold text-center w-full"
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.a
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      whileHover={{ x: 10, color: "#14b8a6" }}
                      href="/login"
                      className="block text-gray-300 font-medium py-2"
                    >
                      Login
                    </motion.a>
                    <motion.a
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      href="/register"
                      className="block bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-4 py-3 rounded-full font-semibold text-center"
                    >
                      Sign Up
                    </motion.a>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}