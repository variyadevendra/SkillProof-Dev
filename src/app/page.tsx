"use client";

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Hero3D from '@/components/3DHero';
import EnhancedFeatures from '@/components/EnhancedFeatures';
import EnhancedTestimonials from '@/components/EnhancedTestimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ClientComponents from '@/components/ClientComponents';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Define shapes outside of component to keep them consistent
const SHAPES = [
  { size: 70, top: '15%', left: '8%', delay: 0, duration: 18 },
  { size: 50, top: '35%', right: '10%', delay: 2, duration: 20 },
  { size: 40, bottom: '25%', left: '12%', delay: 4, duration: 22 },
];

// Define particles outside of component
const PARTICLES = Array.from({ length: 20 }).map(() => ({
  size: Math.random() * 4 + 2,
  initialX: Math.random() * 100,
  initialY: Math.random() * 100,
  direction: Math.random() > 0.5 ? 1 : -1,
}));

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  const { scrollY } = useScroll();
  const scrollYSpring = useSpring(scrollY, { stiffness: 100, damping: 30 });
  
  // Parallax effects for background elements
  const dotOpacity = useTransform(scrollYSpring, [0, 1000], [0.03, 0.08]); 
  const gradientYTop = useTransform(scrollYSpring, [0, 1000], ["0%", "10%"]);
  const gradientYBottom = useTransform(scrollYSpring, [0, 1000], ["0%", "-10%"]);
  const gradientScale = useTransform(scrollYSpring, [0, 1000], [1, 1.2]);
  
  // Color transitions based on scroll
  const gradientHue = useTransform(scrollYSpring, [0, 3000], [0, 20]);
  
  // Pre-calculate all the transforms for shapes outside of render
  const shapeAnimations = SHAPES.map((shape, index) => ({
    y: useTransform(
      scrollYSpring, 
      [0, 1000], 
      [0, index % 2 === 0 ? -100 : 100]
    ),
    rotate: useTransform(
      scrollYSpring,
      [0, 500, 1000],
      [0, 180, 360]
    ),
    scale: useTransform(
      scrollYSpring,
      [0, 500, 1000],
      [1, index % 2 === 0 ? 1.1 : 0.9, 1]
    )
  }));
  
  // Pre-calculate all the transforms for particles outside of render
  const particleAnimations = PARTICLES.map((particle, index) => ({
    x: useTransform(
      scrollYSpring,
      [0, 1000],
      [particle.initialX + "%", (particle.initialX + (index % 2 === 0 ? 10 : -10)) + "%"]
    ),
    y: useTransform(
      scrollYSpring,
      [0, 1000],
      [particle.initialY + "%", (particle.initialY + (index % 2 === 0 ? -15 : 15)) + "%"]
    )
  }));
  
  // Section parallax transforms
  const featuresParallax = useTransform(scrollYSpring, [0, 1000], [0, -50]);
  const testimonialsParallax = useTransform(scrollYSpring, [500, 1500], [0, -50]);
  const ctaParallax = useTransform(scrollYSpring, [1000, 2000], [0, -50]);
  
  // Particles opacity transform
  const particlesOpacity = useTransform(scrollYSpring, [0, 300], [0, 0.5]);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <main 
      className="min-h-screen relative overflow-hidden text-gray-900" 
      id="main-content" 
      key="main-page"
      ref={mainRef}
    >
      {/* Clean white background */}
      <div className="fixed inset-0 bg-white -z-20"></div>
      
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Subtle dot pattern for texture - opacity changes on scroll */}
        <motion.div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', 
            backgroundSize: '50px 50px',
            opacity: dotOpacity
          }}
        />
        
        {/* Subtle gradient accents - position shifts on scroll */}
        <motion.div 
          className="absolute top-0 right-0 w-1/3 h-1/3"
          style={{ y: gradientYTop }}
        >
          <motion.div 
            className="absolute top-0 right-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-15 transform translate-x-1/4 -translate-y-1/4"
            style={{ scale: gradientScale }}
          />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 w-1/3 h-1/3"
          style={{ y: gradientYBottom }}
        >
          <motion.div 
            className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-15 transform -translate-x-1/4 translate-y-1/4"
            style={{ scale: gradientScale }}
          />
        </motion.div>
        
        {/* Floating geometric shapes - only show when mounted to avoid hydration issues */}
        {mounted && SHAPES.map((shape, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 opacity-8"
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
              borderRadius: Math.random() > 0.5 ? '50%' : '30%',
              y: shapeAnimations[index].y,
              rotate: shapeAnimations[index].rotate,
              scale: shapeAnimations[index].scale
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              rotate: [0, 180],
              scale: [1, 1.03, 1]
            }}
            transition={{
              duration: shape.duration,
              ease: "linear",
              repeat: Infinity,
              delay: shape.delay,
              repeatType: "mirror"
            }}
          />
        ))}
        
        {/* Subtle animated gradient accent - color shifts based on scroll */}
        <motion.div 
          className="fixed top-0 w-full h-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 opacity-50"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ 
            backgroundSize: '200% 200%',
            filter: `hue-rotate(${gradientHue}deg)`
          }}
        />
        
        {/* Scroll-triggered particles - appear when scrolling */}
        {mounted && (
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: particlesOpacity }}
          >
            {PARTICLES.map((particle, index) => (
              <motion.div
                key={`particle-${index}`}
                className="absolute rounded-full bg-indigo-300/30"
                style={{
                  width: particle.size,
                  height: particle.size,
                  x: particleAnimations[index].x,
                  y: particleAnimations[index].y,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
      
      <ClientComponents />
      <Header />
      <Hero3D />
      
      {/* Apply parallax scrolling effect to sections */}
      <motion.div style={{ y: featuresParallax }}>
        <EnhancedFeatures />
      </motion.div>
      
      <motion.div style={{ y: testimonialsParallax }}>
        <EnhancedTestimonials />
      </motion.div>
      
      <motion.div style={{ y: ctaParallax }}>
        <CTA />
      </motion.div>
      
      <Footer />
    </main>
  );
}
