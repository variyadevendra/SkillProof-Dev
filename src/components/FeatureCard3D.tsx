"use client";

import { useRef, useState } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FeatureCard3DProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

export default function FeatureCard3D({ 
  title, 
  description, 
  icon, 
  color, 
  delay = 0 
}: FeatureCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth values for card rotation
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 });
  
  // Handle mouse move on card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  // Reset card position when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  
  // Light effect that follows cursor
  const lightX = useTransform(x, [-100, 100], [-50, 50]);
  const lightY = useTransform(y, [-100, 100], [-50, 50]);
  
  return (
    <motion.div
      ref={ref}
      className="relative h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: delay * 0.2,
      }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 h-full transition-shadow relative overflow-hidden"
        style={{
          perspective: 800,
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          boxShadow: isHovered ? `0 20px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(${color === 'indigo' ? '79, 70, 229' : color === 'purple' ? '139, 92, 246' : '236, 72, 153'}, 0.3)` : undefined,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
      >
        {/* Light effect */}
        <motion.div
          className="absolute w-40 h-40 rounded-full pointer-events-none opacity-0 transition-opacity"
          style={{
            background: `radial-gradient(circle, rgba(${color === 'indigo' ? '79, 70, 229' : color === 'purple' ? '139, 92, 246' : '236, 72, 153'}, 0.4) 0%, rgba(255, 255, 255, 0) 70%)`,
            x: lightX,
            y: lightY,
            opacity: isHovered ? 0.4 : 0,
          }}
        />
        
        {/* Card content */}
        <div className="relative z-10">
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gradient-to-r ${
              color === 'indigo' ? 'from-blue-400 to-indigo-500' : 
              color === 'purple' ? 'from-purple-400 to-pink-500' : 
              'from-orange-400 to-pink-500'
            }`}
          >
            <motion.div
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {icon}
            </motion.div>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        
        {/* Bottom decorative bar */}
        <motion.div 
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${
            color === 'indigo' ? 'from-blue-400 to-indigo-500' : 
            color === 'purple' ? 'from-purple-400 to-pink-500' : 
            'from-orange-400 to-pink-500'
          }`}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : { width: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: delay * 0.2 + 0.5,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
} 