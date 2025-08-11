"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ValidationToastProps {
  message: string;
  type: "error" | "success";
  isVisible: boolean;
  onClose: () => void;
}

export default function ValidationToast({ message, type, isVisible, onClose }: ValidationToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-50 max-w-sm mx-auto sm:mx-0"
        >
          <div className={`rounded-lg shadow-lg border p-4 ${
            type === "error" 
              ? "bg-red-50 border-red-200 text-red-800" 
              : "bg-green-50 border-green-200 text-green-800"
          }`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {type === "error" ? (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{message}</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}