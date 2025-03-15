"use client";

import { motion } from 'framer-motion';

export default function LoginIllustration() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        {/* Background elements */}
        <motion.circle
          cx="400"
          cy="300"
          r="150"
          fill="#e9d5ff"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        <motion.circle
          cx="400"
          cy="300"
          r="200"
          stroke="#c084fc"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
        
        <motion.circle
          cx="400"
          cy="300"
          r="250"
          stroke="#c084fc"
          strokeWidth="1"
          strokeDasharray="5,5"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        />
        
        {/* Person on couch with tablet */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Couch/chair */}
          <motion.rect
            x="300"
            y="320"
            width="200"
            height="30"
            rx="5"
            fill="#9333ea"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <motion.rect
            x="300"
            y="280"
            width="30"
            height="40"
            rx="5"
            fill="#9333ea"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <motion.rect
            x="470"
            y="280"
            width="30"
            height="40"
            rx="5"
            fill="#9333ea"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Person */}
          {/* Body */}
          <motion.rect
            x="370"
            y="230"
            width="60"
            height="90"
            rx="20"
            fill="#9333ea"
            initial={{ y: 10 }}
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Head */}
          <motion.circle
            cx="400"
            cy="200"
            r="30"
            fill="#9333ea"
            initial={{ y: 10 }}
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Arms */}
          <motion.rect
            x="350"
            y="250"
            width="15"
            height="50"
            rx="7"
            fill="#9333ea"
            initial={{ rotate: -5, x: 0 }}
            animate={{ rotate: [-8, -5, -8], x: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.rect
            x="435"
            y="250"
            width="15"
            height="50"
            rx="7"
            fill="#9333ea"
            initial={{ rotate: 5, x: 0 }}
            animate={{ rotate: [8, 5, 8], x: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.g>
        
        {/* Tablet/device */}
        <motion.g
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.rect
            x="350"
            y="270"
            width="100"
            height="70"
            rx="5"
            fill="white"
            stroke="#c084fc"
            strokeWidth="2"
            initial={{ y: 0 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.5, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Screen content */}
          <motion.rect x="360" y="280" width="80" height="5" rx="2" fill="#e5e7eb" />
          <motion.rect x="360" y="295" width="80" height="5" rx="2" fill="#e5e7eb" />
          <motion.rect x="360" y="310" width="50" height="5" rx="2" fill="#e5e7eb" />
          <motion.rect x="360" y="325" width="40" height="8" rx="4" fill="#8b5cf6" />
        </motion.g>
        
        {/* Decorative elements */}
        <motion.g>
          {/* Stars/sparkles */}
          <motion.path
            d="M320 150 L330 150 L325 140 L320 150 Z"
            fill="#8b5cf6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
            transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
          />
          
          <motion.path
            d="M480 130 L490 130 L485 120 L480 130 Z"
            fill="#8b5cf6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
            transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 2.5 }}
          />
          
          <motion.path
            d="M500 250 L510 250 L505 240 L500 250 Z"
            fill="#8b5cf6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
            transition={{ duration: 2, delay: 2.5, repeat: Infinity, repeatDelay: 3.5 }}
          />
          
          {/* Floating particles */}
          <motion.circle
            cx="300"
            cy="200"
            r="5"
            fill="#c084fc"
            initial={{ opacity: 0.5 }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <motion.circle
            cx="500"
            cy="350"
            r="5"
            fill="#c084fc"
            initial={{ opacity: 0.5 }}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
          
          <motion.circle
            cx="450"
            cy="170"
            r="4"
            fill="#c084fc"
            initial={{ opacity: 0.5 }}
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
} 