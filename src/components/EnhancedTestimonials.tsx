"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function EnhancedTestimonials() {
  const testimonials = [
    {
      id: 1,
      content: "SkillProof completely transformed our hiring process. We've reduced our time-to-hire by 60% and found candidates who were demonstrably more qualified than those we found through traditional processes.",
      name: "Sarah Johnson",
      title: "Head of Talent, TechVision",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      type: "employer"
    },
    {
      id: 2,
      content: "As someone who struggled to showcase my skills on paper, this platform has been a game-changer. I was able to demonstrate my coding abilities through real challenges and landed a job at my dream company within weeks.",
      name: "David Chen",
      title: "Software Engineer, DataStream",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      type: "candidate"
    },
    {
      id: 3,
      content: "The skill validation approach eliminates the bias that often comes with traditional resumes. We've built a more diverse engineering team with a wider range of backgrounds and perspectives.",
      name: "Michael Robinson",
      title: "CTO, Elevate Solutions",
      image: "https://randomuser.me/api/portraits/men/26.jpg",
      type: "employer"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-5, 5]);
  
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextTestimonial = useCallback(() => {
    setCurrent((prevCurrent) => 
      prevCurrent === testimonials.length - 1 ? 0 : prevCurrent + 1
    );
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrent((prevCurrent) =>
      prevCurrent === 0 ? testimonials.length - 1 : prevCurrent - 1
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, nextTestimonial]);

  // Animation variants for title letters
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const titleText = "Success Stories";
  const titleArray = titleText.split('');

  // Function to handle drag end (swiping)
  const handleDragEnd = (e: any, { offset }: any) => {
    if (offset.x < -50) {
      nextTestimonial();
    } else if (offset.x > 50) {
      prevTestimonial();
    }
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white -z-10" />
      
      {/* Decorative shapes */}
      <motion.div 
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-purple-100 opacity-20 -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-indigo-100 opacity-20 -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -5, 0],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 12,
          delay: 1,
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          {/* Animated title with letter-by-letter animation */}
          <div ref={titleRef} className="overflow-hidden mb-4">
            <h2 className="text-4xl md:text-5xl font-bold inline-block">
              {titleArray.map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  custom={i}
                  initial="hidden"
                  animate={titleInView ? "visible" : "hidden"}
                  className={`inline-block ${
                    letter === ' ' ? 'mr-2' : ''
                  }`}
                >
                  {letter}
                </motion.span>
              ))}
            </h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Hear from employers and candidates who've experienced the difference
          </motion.p>
        </div>

        <div 
          ref={constraintsRef}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          {/* 3D Card */}
          <motion.div
            className="perspective-1000"
            style={{
              rotateY: rotate,
            }}
          >
            <motion.div 
              className="relative bg-white rounded-2xl overflow-hidden shadow-2xl p-8 pt-14 pb-12"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{ x }}
              whileTap={{ cursor: "grabbing" }}
            >
              {/* Color bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600" />
              
              <div className="h-56 sm:h-48">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-full flex flex-col justify-between"
                  >
                    {/* Quote mark */}
                    <div className="absolute top-0 left-0 text-8xl font-serif text-indigo-100">"</div>
                    
                    {/* Content */}
                    <p className="text-lg text-gray-700 italic relative z-10 mb-6">
                      {testimonials[current].content}
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-indigo-200 shadow-md">
                        <Image 
                          src={testimonials[current].image} 
                          alt={testimonials[current].name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold">{testimonials[current].name}</p>
                        <p className="text-sm text-gray-600">{testimonials[current].title}</p>
                      </div>
                      
                      {/* Type badge */}
                      <div className={`ml-auto px-3 py-1 rounded-full text-xs ${
                        testimonials[current].type === 'employer' 
                          ? 'bg-indigo-100 text-indigo-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {testimonials[current].type === 'employer' ? 'Employer' : 'Candidate'}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Pagination dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all relative`}
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={false}
                  animate={{
                    backgroundColor: index === current ? '#4f46e5' : '#e0e7ff',
                    scale: index === current ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="absolute -bottom-4 w-full flex justify-between px-4">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors"
              whileHover={{ scale: 1.1, backgroundColor: '#f5f3ff' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors"
              whileHover={{ scale: 1.1, backgroundColor: '#f5f3ff' }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
          
          {/* Instructions */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1 }}
            className="text-center text-gray-500 text-sm mt-16"
          >
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">Drag to swipe through testimonials</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
} 