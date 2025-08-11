"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Globe,
  Plane,
  Camera,
  Heart,
} from "lucide-react";
import ValidationToast from "../components/ValidationToast";
import { validateDestination, getDateValidation } from "../lib/validation";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchData, setSearchData] = useState({ destination: "", date: "" });
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error" as "error" | "success",
  });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const destValidation = validateDestination(searchData.destination);
    if (!destValidation.isValid) {
      setToast({ show: true, message: destValidation.message!, type: "error" });
      return;
    }

    if (searchData.date) {
      const selectedDate = new Date(searchData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setToast({
          show: true,
          message: "Please select a future date for your trip",
          type: "error",
        });
        return;
      }
    }

    window.location.href = `/city-search?q=${encodeURIComponent(
      searchData.destination
    )}`;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setToast({
        show: true,
        message: "Please enter your email address",
        type: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToast({
        show: true,
        message: "Please enter a valid email address",
        type: "error",
      });
      return;
    }

    setIsSubscribed(true);
    setEmail("");
    setToast({
      show: true,
      message: "Successfully subscribed to our newsletter!",
      type: "success",
    });
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const luxuryVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut" as const,
        staggerChildren: 0.15,
      },
    },
  };

  const premiumCardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
    hover: {
      y: -20,
      scale: 1.02,
      rotateX: 5,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navigation Bar */}
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
                className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-slate-900 font-bold text-lg">🌍</span>
              </motion.div>
              <div>
                <motion.h1
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="text-2xl font-bold text-white tracking-wide hover:bg-gradient-to-r hover:from-white hover:via-teal-400 hover:to-white hover:bg-clip-text hover:text-transparent transition-all duration-300"
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative h-[100vh] overflow-hidden"
        style={{
          backgroundImage: "url('https://i.ibb.co/FLtCHdWV/travel-BG.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          filter: "contrast(1.1) saturate(1.2) brightness(1.1)",
        }}
      >
        {/* Animated Background Overlay */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/40 to-slate-900/60"
        />

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 text-white/20 hidden lg:block"
        >
          <Plane size={60} />
        </motion.div>
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-20 text-white/20 hidden lg:block"
        >
          <Globe size={80} />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 1.2,
              ease: "easeOut" as const,
            }}
            className="text-white max-w-5xl"
          >
            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">
                Premium Travel Experiences
              </span>
            </motion.div>

            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight"
            >
              Discover{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="font-bold bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Extraordinary
              </motion.span>
              <br />
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Destinations
              </span>
            </motion.h2>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-xl md:text-2xl mb-10 text-gray-200 font-light leading-relaxed max-w-3xl"
            >
              Embark on unforgettable journeys to the world&apos;s most
              breathtaking destinations. From pristine beaches to majestic
              mountains, your dream adventure awaits.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="/plan-trip"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-4 rounded-full text-white font-semibold shadow-2xl hover:shadow-teal-500/25 transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span>Plan Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="/userprofile"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full text-white font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                <MapPin className="w-5 h-5" />
                <span>My Profile</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Premium Search Experience
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeOut" as const }}
        className="-mt-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-6"
      >
        <motion.div
          whileHover={{
            y: -10,
            boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.3)",
          }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50"
        >
          <motion.div
            variants={luxuryVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                label: "Destination",
                type: "input",
                placeholder: "Where shall we take you?",
                span: "sm:col-span-2 lg:col-span-1",
              },
              {
                label: "Travel Style",
                type: "select",
                options: ["Luxury", "Adventure", "Cultural", "Wellness"],
              },
              {
                label: "Experience",
                type: "select",
                options: ["Private", "Small Group", "Exclusive", "Bespoke"],
              },
              {
                label: "",
                type: "button",
                text: "Begin Journey",
                span: "sm:col-span-2 lg:col-span-1",
              },
            ].map((field, index) => (
              <motion.div
                key={index}
                variants={luxuryVariants}
                className={field.span || ""}
              >
                {field.label && (
                  <label className="block text-sm font-medium text-slate-700 mb-3 tracking-wide">
                    {field.label}
                  </label>
                )}
                {field.type === "input" && (
                  <motion.input
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)",
                    }}
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                  />
                )}
                {field.type === "select" && (
                  <motion.select
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.1)",
                    }}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                  >
                    {field.options?.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </motion.select>
                )}
                {field.type === "button" && (
                  <div className="flex items-end">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        y: -3,
                        boxShadow: "0 20px 40px -10px rgba(20, 184, 166, 0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-7 bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      {field.text}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div> */}

      {/* Quick Search Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="-mt-16 relative z-10 max-w-4xl mx-auto px-4 sm:px-6"
      >
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-200/50"
        >
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Where to?
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={searchData.destination}
                onChange={(e) =>
                  setSearchData((prev) => ({
                    ...prev,
                    destination: e.target.value,
                  }))
                }
                placeholder="Search destinations..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                When?
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="date"
                value={searchData.date}
                onChange={(e) =>
                  setSearchData((prev) => ({ ...prev, date: e.target.value }))
                }
                min={getDateValidation().min}
                max={getDateValidation().max}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-end">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!searchData.destination.trim()}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white p-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Search
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-light text-slate-900 mb-4">
              Why Choose
              <span className="block font-bold bg-gradient-to-r from-teal-600 to-yellow-500 bg-clip-text text-transparent">
                GlobeTrotter?
              </span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Curated Destinations",
                desc: "Hand-picked locations by travel experts",
                color: "from-blue-500 to-teal-500",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Guides",
                desc: "Local guides with deep cultural knowledge",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Personalized Experience",
                desc: "Tailored trips based on your preferences",
                color: "from-orange-500 to-red-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:shadow-lg transition-all`}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Exclusive Destinations */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Camera className="w-12 h-12 text-teal-500" />
          </motion.div>
          <h3 className="text-5xl font-light text-slate-900 mb-6">
            Featured
            <span className="block font-bold bg-gradient-to-r from-teal-600 to-yellow-500 bg-clip-text text-transparent">
              Destinations
            </span>
          </h3>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover breathtaking locations handpicked by our travel experts.
            Each destination offers unique experiences and unforgettable
            memories.
          </p>
        </motion.div>

        <motion.div
          variants={luxuryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Maldives Paradise",
              desc: "Crystal clear waters and stunning overwater villas with world-class amenities",
              price: "2,49,999",
              original: "3,50,000",
              gradient: "from-teal-400 via-blue-500 to-slate-600",
              rating: 4.9,
              duration: "7 Days",
              image:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            },
            {
              title: "Swiss Mountain Escape",
              desc: "Breathtaking Alpine views and luxury mountain resorts",
              price: "3,89,999",
              original: "5,25,000",
              gradient: "from-yellow-400 via-orange-500 to-slate-700",
              rating: 4.8,
              duration: "10 Days",
              image:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            },
            {
              title: "African Safari Adventure",
              desc: "Wildlife encounters and luxury camping under the stars",
              price: "4,99,999",
              original: "6,75,000",
              gradient: "from-slate-600 via-amber-500 to-teal-500",
              rating: 4.9,
              duration: "12 Days",
              image:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            },
          ].map((destination, index) => (
            <motion.div
              key={index}
              variants={premiumCardVariants}
              whileHover="hover"
              className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100/50 relative"
            >
              <motion.div
                className="h-72 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${destination.gradient} opacity-80`}
                />
                <motion.div
                  className="absolute inset-0 bg-black/20"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.4 }}
                />

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium flex items-center space-x-1"
                >
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{destination.rating}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium"
                >
                  {destination.duration}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                    <h4 className="text-white font-semibold text-lg mb-1">
                      {destination.title}
                    </h4>
                    <p className="text-white/80 text-sm">
                      {destination.duration} • {destination.rating} ★
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                whileHover={{ backgroundColor: "rgb(249 250 251)" }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-semibold mb-2 text-slate-900 group-hover:text-teal-600 transition-colors">
                      {destination.title}
                    </h4>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(destination.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({destination.rating})
                      </span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-teal-100 p-2 rounded-full"
                  >
                    <MapPin className="w-5 h-5 text-teal-600" />
                  </motion.div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {destination.desc}
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-baseline space-x-2 mb-4"
                >
                  <span className="text-teal-500 font-bold text-xl">₹</span>
                  <span className="text-slate-900 font-bold text-2xl">
                    {destination.price}
                  </span>
                  <span className="text-gray-400 text-lg line-through">
                    ₹{destination.original}
                  </span>
                </motion.div>

                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="flex items-center space-x-2 text-sm text-emerald-600 font-medium"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Limited Time Offer!</span>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-teal-50 via-white to-yellow-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-light text-slate-900 mb-4">
              What Our
              <span className="block font-bold bg-gradient-to-r from-teal-600 to-yellow-500 bg-clip-text text-transparent">
                Travelers Say
              </span>
            </h3>
          </motion.div>

          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {[
              {
                name: "Sarah Johnson",
                location: "New York, USA",
                text: "GlobeTrotter made our honeymoon absolutely magical. Every detail was perfect, from the luxury accommodations to the personalized experiences.",
                rating: 5,
                image: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Raj Patel",
                location: "Mumbai, India",
                text: "The Swiss Alps trip exceeded all expectations. Professional guides, stunning locations, and memories that will last a lifetime.",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
              },
              {
                name: "Emma Wilson",
                location: "London, UK",
                text: "From booking to return, everything was seamless. The attention to detail and customer service is unmatched in the travel industry.",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
              },
            ].map(
              (testimonial, index) =>
                currentTestimonial === index && (
                  <motion.div
                    key={index}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex-shrink-0"
                      >
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={100}
                          height={100}
                          className="rounded-full border-4 border-teal-200"
                          unoptimized={true}
                        />
                      </motion.div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start items-center space-x-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>

                        <blockquote className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-6 italic">
                          &quot;{testimonial.text}&quot;
                        </blockquote>

                        <div>
                          <div className="font-semibold text-gray-900 text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-600">
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </motion.div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {[0, 1, 2].map((index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentTestimonial === index
                    ? "bg-teal-500 shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Previous Trips */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-light text-slate-900 mb-4">
              Previous
              <span className="block font-bold bg-gradient-to-r from-slate-700 to-teal-500 bg-clip-text text-transparent">
                Trips
              </span>
            </h3>
            <p className="text-gray-600 text-lg">
              See what our travelers experienced
            </p>
          </motion.div>

          <motion.div
            variants={luxuryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                name: "Rajasthan Palace Heritage",
                location: "Jaipur, Udaipur, Jodhpur",
                rating: 4.9,
                reviews: 127,
                image:
                  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
                duration: "8 days",
              },
              {
                name: "Kerala Backwater Cruise",
                location: "Alleppey, Kumarakom",
                rating: 4.8,
                reviews: 89,
                image:
                  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop",
                duration: "6 days",
              },
              {
                name: "Goa Beach Paradise",
                location: "North & South Goa",
                rating: 4.7,
                reviews: 156,
                image:
                  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop",
                duration: "5 days",
              },
              {
                name: "Himachal Mountain Retreat",
                location: "Manali, Shimla, Dharamshala",
                rating: 4.9,
                reviews: 94,
                image:
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                duration: "7 days",
              },
            ].map((trip, index) => (
              <motion.div
                key={index}
                variants={premiumCardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3 },
                }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/50 group"
              >
                <div className="flex flex-col md:flex-row">
                  <motion.div
                    className="md:w-80 h-48 md:h-auto relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={trip.image}
                      alt={trip.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span className="font-semibold">{trip.rating}</span>
                        <span className="text-sm opacity-90">
                          ({trip.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex-1 p-8"
                    whileHover={{ backgroundColor: "rgb(249 250 251)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-2xl font-semibold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                          {trip.name}
                        </h4>
                        <p className="text-gray-600 mb-2">{trip.location}</p>
                        <p className="text-sm text-gray-500">{trip.duration}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-right"
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < Math.floor(trip.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {trip.reviews} travelers
                        </p>
                      </motion.div>
                    </div>

                    <motion.div className="flex items-center justify-center pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          Overall Experience:
                        </span>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400 text-lg">★</span>
                          <span className="font-semibold text-slate-900">
                            {trip.rating}/5
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-teal-600 to-teal-700"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h3 className="text-4xl font-bold mb-4">Stay Updated</h3>
            <p className="text-xl text-teal-100 mb-8">
              Get exclusive travel deals and destination insights delivered to
              your inbox
            </p>

            <motion.form
              onSubmit={handleSubscribe}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-3 rounded-full text-gray-900 bg-white/90 focus:outline-none focus:ring-4 focus:ring-teal-200 transition-all border border-teal-300"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubscribed}
                className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isSubscribed ? "✓ Subscribed!" : "Subscribe"}
              </motion.button>
            </motion.form>

            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-teal-100 text-sm mt-4 text-center"
              >
                Thank you for subscribing! Check your email for exclusive deals.
              </motion.p>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1, ease: "easeOut" as const }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.a
          href="/plan-trip"
          whileHover={{
            scale: 1.15,
            rotate: [0, -3, 3, 0],
            boxShadow: "0 20px 40px -10px rgba(20, 184, 166, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -8, 0],
            boxShadow: [
              "0 10px 30px -5px rgba(20, 184, 166, 0.2)",
              "0 20px 40px -10px rgba(20, 184, 166, 0.3)",
              "0 10px 30px -5px rgba(20, 184, 166, 0.2)",
            ],
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-4 rounded-full font-semibold shadow-2xl backdrop-blur-sm border border-teal-400/20 group"
        >
          <Plane className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Plan Journey</span>
          <span className="sm:hidden">Plan</span>
        </motion.a>
      </motion.div>

      <ValidationToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
