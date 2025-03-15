"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <motion.div 
            className="md:w-1/2 text-center md:text-left"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.span 
              variants={itemVariants}
              className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-4 py-1 text-sm font-medium mb-6"
            >
              Revolutionizing Hiring • No Resumes Required
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="block">Hire for</span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Skills, Not Stories
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 max-w-xl"
            >
              Our platform replaces traditional resumes with skill validation challenges, live project demonstrations, and AI-enhanced assessments.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all"
              >
                Get Started Free
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 border border-indigo-200 hover:border-indigo-300 font-medium py-3 px-8 rounded-full transition-all"
              >
                See How It Works
              </motion.button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex items-center justify-center md:justify-start"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                    <Image
                      src={`https://randomuser.me/api/portraits/men/${i + 30}.jpg`}
                      alt={`User ${i}`}
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
              <span className="ml-4 text-sm text-gray-600">
                <span className="font-semibold">500+</span> companies already onboard
              </span>
            </motion.div>
          </motion.div>
          
          {/* Image/Illustration */}
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              animate={floatingAnimation}
              className="relative z-10"
            >
              <Image
                src="/hero-illustration.svg"
                alt="Skill validation platform illustration"
                width={600}
                height={500}
                className="w-full h-auto"
                priority
              />
            </motion.div>
            
            {/* Decorative Elements */}
            <motion.div 
              className="absolute w-64 h-64 bg-indigo-300 rounded-full filter blur-3xl opacity-20 -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            <motion.div 
              className="absolute w-40 h-40 bg-purple-300 rounded-full filter blur-3xl opacity-20 -z-10 bottom-10 -right-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 