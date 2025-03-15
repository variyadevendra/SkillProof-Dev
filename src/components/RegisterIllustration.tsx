"use client";

import { motion } from 'framer-motion';

export default function RegisterIllustration() {
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
        
        {/* User figure */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Body */}
          <motion.rect
            x="370"
            y="280"
            width="60"
            height="90"
            rx="20"
            fill="#9333ea"
            initial={{ y: 10 }}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Head */}
          <motion.circle
            cx="400"
            cy="250"
            r="30"
            fill="#9333ea"
            initial={{ y: 10 }}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Arms */}
          <motion.rect
            x="345"
            y="290"
            width="15"
            height="50"
            rx="7"
            fill="#9333ea"
            initial={{ rotate: 0 }}
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <motion.rect
            x="440"
            y="290"
            width="15"
            height="50"
            rx="7"
            fill="#9333ea"
            initial={{ rotate: 0 }}
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>
        
        {/* Document/Form */}
        <motion.g
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.rect
            x="460"
            y="280"
            width="100"
            height="130"
            rx="5"
            fill="white"
            initial={{ y: 0 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
          />
          
          {/* Form lines */}
          <motion.rect x="475" y="300" width="70" height="5" rx="2" fill="#e5e7eb" />
          <motion.rect x="475" y="320" width="70" height="5" rx="2" fill="#e5e7eb" />
          <motion.rect x="475" y="340" width="70" height="5" rx="2" fill="#e5e7eb" />
          <motion.rect x="475" y="360" width="40" height="5" rx="2" fill="#e5e7eb" />
          
          {/* Checkmark appearing */}
          <motion.path
            d="M480 380 L490 390 L510 370"
            stroke="#8b5cf6"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          />
        </motion.g>
        
        {/* Decorative elements */}
        <motion.g>
          {/* Stars/sparkles */}
          <motion.path
            d="M320 200 L330 200 L325 190 L320 200 Z"
            fill="#8b5cf6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
            transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
          />
          
          <motion.path
            d="M500 180 L510 180 L505 170 L500 180 Z"
            fill="#8b5cf6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
            transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 2.5 }}
          />
          
          <motion.path
            d="M450 400 L460 400 L455 390 L450 400 Z"
            fill="#8b5cf6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
            transition={{ duration: 2, delay: 2.5, repeat: Infinity, repeatDelay: 3.5 }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
} 