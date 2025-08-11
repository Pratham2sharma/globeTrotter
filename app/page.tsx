"use client";
import { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

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
              {["Destinations", "Experiences", "Concierge"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{
                    y: -3,
                    color: "#14b8a6",
                    textShadow: "0 0 8px rgba(20, 184, 166, 0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-300 font-medium tracking-wide relative group"
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-teal-400 to-yellow-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.a>
              ))}
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
                Profile
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
                  {["Destinations", "Experiences", "Concierge"].map((item) => (
                    <motion.a
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ x: 10, color: "#14b8a6" }}
                      href="#"
                      className="block text-gray-300 font-medium py-2"
                    >
                      {item}
                    </motion.a>
                  ))}
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    href="/userprofile"
                    className="block bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-4 py-3 rounded-full font-semibold text-center"
                  >
                    My Journey
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
        className="relative h-[90vh] overflow-hidden"
        style={{
          backgroundImage: "url('https://i.ibb.co/FLtCHdWV/travel-BG.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          filter: "contrast(1.1) saturate(1.2) brightness(1.1)",
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/40 to-slate-900/60"
        />
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
            className="text-white max-w-4xl"
          >
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight"
            >
              Curated{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="font-bold bg-gradient-to-r from-teal-400 via-yellow-400 to-teal-400 bg-clip-text text-transparent bg-[length:200%_100%]"
              >
                Luxury Journeys
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 text-gray-300 font-light leading-relaxed max-w-2xl"
            >
              Escape the ordinary. Create memories that last forever with
              handpicked destinations and premium experiences.
            </motion.p>
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
          <h3 className="text-4xl font-light text-slate-900 mb-4">
            Dream
            <span className="block font-bold bg-gradient-to-r from-teal-600 to-yellow-500 bg-clip-text text-transparent">
              Destinations
            </span>
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Amazing places waiting for you. From tropical beaches to mountain
            peaks - your perfect getaway is here.
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
              desc: "Crystal clear waters and stunning overwater villas",
              price: "2,49,999",
              original: "3,50,000",
              gradient: "from-teal-400 via-blue-500 to-slate-600",
            },
            {
              title: "Swiss Mountain Escape",
              desc: "Breathtaking views and world-class hospitality",
              price: "3,89,999",
              original: "5,25,000",
              gradient: "from-yellow-400 via-orange-500 to-slate-700",
            },
            {
              title: "African Safari Adventure",
              desc: "Wildlife encounters and luxury camping under stars",
              price: "4,99,999",
              original: "6,75,000",
              gradient: "from-slate-600 via-amber-500 to-teal-500",
            },
          ].map((destination, index) => (
            <motion.div
              key={index}
              variants={premiumCardVariants}
              whileHover="hover"
              className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100/50"
            >
              <motion.div
                className={`h-64 bg-gradient-to-br ${destination.gradient} relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="absolute inset-0 bg-black/30"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium"
                >
                  Premium
                </motion.div>
              </motion.div>

              <motion.div
                whileHover={{ backgroundColor: "rgb(249 250 251)" }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <h4 className="text-2xl font-semibold mb-3 text-slate-900 group-hover:text-teal-600 transition-colors">
                  {destination.title}
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {destination.desc}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-baseline space-x-2 mb-2"
                >
                  <span className="text-teal-500 font-bold text-xl">₹</span>
                  <span className="text-slate-900 font-bold text-2xl">
                    {destination.price}
                  </span>
                  <span className="text-gray-400 text-lg line-through">
                    ₹{destination.original}
                  </span>
                </motion.div>
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-sm text-emerald-600 font-medium"
                >
                  Book Now - Limited Spots!
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Previous Trips */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
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

                    <motion.div className="flex items-center justify-between pt-4 border-t border-gray-100">
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
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
                      >
                        View Details →
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Premium CTA Button */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: 1, ease: "easeOut" as const }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
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
          className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold shadow-2xl backdrop-blur-sm border border-teal-400/20"
        >
          <span className="hidden sm:inline">✈️ Plan Luxury Journey</span>
          <span className="sm:hidden">✈️ Plan</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
