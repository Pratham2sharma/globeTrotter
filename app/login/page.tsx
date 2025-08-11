"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";
import { Eye, EyeOff, Mail, Lock, Globe } from "lucide-react";
import ValidationToast from "../../components/ValidationToast";
import { validateEmail } from "../../lib/validation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const router = useRouter();
const { login, isLoading, error, clearError, user } = useAuthStore();
const [toast, setToast] = useState({ show: false, message: '', type: 'error' as 'error' | 'success' });


  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setToast({ show: true, message: emailValidation.message!, type: 'error' });
      return;
    }

    if (!password.trim()) {
      setToast({ show: true, message: 'Password is required', type: 'error' });
      return;
    }

    const success = await login(email, password);
    if (!success) {
      // Error is handled by the store
    } else {
      setToast({ show: true, message: 'Login successful!', type: 'success' });
    }
    // Redirect will be handled by useEffect after user is updated
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] flex items-center justify-center p-4">
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
            Welcome Back
          </h1>
          <p className="text-sm text-[#343A40]">
            Sign in to continue your journey
          </p>
        </div>

        {error && (
          <div className="mx-8 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                className="w-full pl-9 pr-3 py-3 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)]"
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
                className="w-full pl-9 pr-10 py-3 border-2 border-[#5BC0BE] rounded-lg bg-[#F8F9FA] text-[#343A40] text-sm outline-none focus:border-[#FFD700] focus:shadow-[0_0_0_2px_rgba(255,215,0,0.1)]"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#FFD700] text-[#0A192F] font-semibold rounded-lg hover:bg-[#FFD700]/90 transition-colors disabled:opacity-50 mt-2"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="text-center text-sm mt-4">
              <span className="text-[#343A40]">Don&apos;t have an account? </span>
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-[#5BC0BE] font-semibold hover:underline"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </motion.div>
      
      <ValidationToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default LoginPage;
