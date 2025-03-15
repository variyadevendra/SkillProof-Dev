"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content: "SkillProof completely transformed our hiring process. We've reduced our time-to-hire by 60% and found candidates who were demonstrably more qualified than those we found through traditional processes.",
      name: "Sarah Johnson",
      title: "Head of Talent, TechVision",
      image: "/avatar-1.png",
      type: "employer"
    },
    {
      id: 2,
      content: "As someone who struggled to showcase my skills on paper, this platform has been a game-changer. I was able to demonstrate my coding abilities through real challenges and landed a job at my dream company within weeks.",
      name: "David Chen",
      title: "Software Engineer, DataStream",
      image: "/avatar-2.png",
      type: "candidate"
    },
    {
      id: 3,
      content: "The skill validation approach eliminates the bias that often comes with traditional resumes. We've built a more diverse engineering team with a wider range of backgrounds and perspectives.",
      name: "Michael Robinson",
      title: "CTO, Elevate Solutions",
      image: "/avatar-3.png",
      type: "employer"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

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

  return (
    <section id="testimonials" className="py-20 bg-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Hear from employers and candidates who've experienced the difference
          </motion.p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-white"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-2xl" />
          
          <div className="p-8 pt-20 pb-14 relative">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-1 bg-indigo-200">
                <motion.div 
                  className="h-full bg-indigo-600"
                  animate={{ width: `${(current + 1) / testimonials.length * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            <div className="relative h-48 sm:h-40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-lg text-gray-700 italic mb-6">"{testimonials[current].content}"</p>
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-indigo-200">
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {testimonials[current].image ? (
                          <Image 
                            src={testimonials[current].image} 
                            alt={testimonials[current].name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{testimonials[current].name.charAt(0)}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold">{testimonials[current].name}</p>
                      <p className="text-sm text-gray-600">{testimonials[current].title}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === current ? 'bg-indigo-600 scale-110' : 'bg-indigo-200'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-indigo-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-indigo-50 transition-colors"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 