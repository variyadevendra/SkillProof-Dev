"use client";

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="h-16 w-16 rounded-full border-t-4 border-b-4 border-purple-600"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            <motion.div
              className="absolute top-0 left-0 h-16 w-16 rounded-full border-r-4 border-transparent"
              animate={{ rotate: -360 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>
        </motion.div>
        <motion.h2
          className="mt-6 text-xl font-semibold text-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Loading...
        </motion.h2>
        <motion.p
          className="mt-2 text-sm text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Setting up your dashboard
        </motion.p>
      </div>
    </div>
  );
} 