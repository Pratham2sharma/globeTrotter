"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Globe,
  User,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    const success = await register({
      firstName,
      lastName,
      email,
      phone,
      city,
      country,
      password,
      confirmPassword,
      additionalInfo,
    });

    if (success) {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#0A192F] font-sans overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-[#F8F9FA] rounded-3xl shadow-2xl overflow-hidden relative z-10 m-5"
      >
        <div className="p-8 pb-6 text-center">
          <div className="inline-flex p-3 rounded-full bg-[#0A192F] mb-3">
            <Globe size={32} className="text-[#FFD700]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0A192F] mb-2">
            Join GlobeTrotter
          </h1>
          <p className="text-sm text-[#343A40]">
            Start your journey with us today
          </p>
        </div>

        {error && (
          <div className="mx-8 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5BC0BE] pointer-events-none z-10"
                />
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none transition-all focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)]"
                />
              </div>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5BC0BE] pointer-events-none z-10"
                />
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none transition-all focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)]"
                />
              </div>
            </div>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#5BC0BE] pointer-events-none z-10"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full pl-9 pr-3 py-2.5 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none transition-all focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)]"
              />
            </div>

            <div className="relative">
              <Phone
                size={16}
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#5BC0BE] pointer-events-none z-10"
              />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full pl-9 pr-3 py-2.5 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none transition-all focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#5BC0BE] pointer-events-none z-10"
                />
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full pl-9 pr-3 py-2.5 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none transition-all focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)]"
                />
              </div>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#5BC0BE] pointer-events-none z-10"
                />
                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  className="w-full pl-9 pr-3 py-2.5 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none transition-all focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)]"
                />
              </div>
            </div>

            <div className="relative">
              <FileText
                size={16}
                className="absolute left-2.5 top-3 text-[#5BC0BE] pointer-events-none z-10"
              />
              <textarea
                name="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Additional Information (Optional)"
                rows={2}
                className="w-full pl-9 pr-3 py-2.5 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none transition-all focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)] resize-none"
              />
            </div>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#5BC0BE] pointer-events-none z-10"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-9 pr-10 py-2.5 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none transition-all focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 p-1"
              >
                {showPassword ? (
                  <EyeOff size={16} className="text-[#5BC0BE]" />
                ) : (
                  <Eye size={16} className="text-[#5BC0BE]" />
                )}
              </button>
            </div>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[#5BC0BE] pointer-events-none z-10"
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full pl-9 pr-10 py-2.5 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none transition-all focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 p-1"
              >
                {showConfirmPassword ? (
                  <EyeOff size={16} className="text-[#5BC0BE]" />
                ) : (
                  <Eye size={16} className="text-[#5BC0BE]" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#FFD700] text-[#0A192F] font-semibold rounded-lg hover:bg-[#FFD700]/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center text-sm mt-2">
              <span className="text-[#343A40]">Already have an account? </span>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-[#5BC0BE] font-semibold hover:underline"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;