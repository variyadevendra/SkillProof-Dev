"use client";

import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Use a safe version of useLayoutEffect that falls back to useEffect during SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Use motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Add spring physics for smoother, more natural movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Check for interactive elements and update cursor state
  const updateCursorState = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check if hovering over interactive element
    const isInteractive = 
      target.tagName.toLowerCase() === 'a' || 
      target.tagName.toLowerCase() === 'button' ||
      target.tagName.toLowerCase() === 'input' ||
      target.classList.contains('cursor-pointer') ||
      target.querySelector('a, button') !== null ||
      target.closest('a, button') !== null;
    
    setIsPointer(isInteractive);
    setIsHovering(isInteractive);
  }, []);

  // Handle mouse movement
  const onMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    updateCursorState(e);
  }, [cursorX, cursorY, updateCursorState]);

  // Handle mouse down/up events for click animation
  const onMouseDown = useCallback(() => {
    setIsHovering(true);
  }, []);

  const onMouseUp = useCallback(() => {
    setIsHovering(isPointer);
  }, [isPointer]);

  // Handle mouse enter/leave events for the window
  const onMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Set up event listeners - using useIsomorphicLayoutEffect to handle DOM safely
  useIsomorphicLayoutEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseMove, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave]);

  // Handle touch devices
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isTouchDevice = (
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0
    );
    
    if (isTouchDevice) {
      setIsVisible(false);
    }
  }, []);

  // Don't render cursor on touch devices or during SSR
  if (typeof window === 'undefined' || 
      (typeof window !== 'undefined' && 'ontouchstart' in window)) {
    return null;
  }

  return (
    <div className="cursor-container">
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isHovering ? 0.5 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          <motion.div 
            className="absolute rounded-full bg-indigo-600 mix-blend-difference"
            animate={{
              width: isPointer ? 40 : 12,
              height: isPointer ? 40 : 12,
            }}
            transition={{ duration: 0.2 }}
            style={{
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
          
          {/* Ripple effect on hover */}
          {isHovering && (
            <motion.div
              className="absolute rounded-full border border-indigo-400"
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ 
                width: [0, 80],
                height: [0, 80],
                opacity: [1, 0],
              }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 0,
              }}
              style={{
                translateX: '-50%',
                translateY: '-50%',
              }}
            />
          )}
          
          {/* Text for interactive elements */}
          {isPointer && (
            <motion.span
              className="absolute text-xs text-white font-medium mix-blend-difference"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                translateX: '-50%',
                translateY: '-50%',
                whiteSpace: 'nowrap',
              }}
            >
              Click
            </motion.span>
          )}
        </motion.div>
      </motion.div>
      
      {/* Trailer dot with delay for interesting effect */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-purple-500 opacity-30 z-40 pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 0.3 : 0,
          transition: 'opacity 0.3s ease',
          filter: 'blur(2px)',
        }}
      />
      
      {/* Apply cursor styling more safely */}
      <style jsx global>{`
        html {
          cursor: none;
        }
        body {
          cursor: none;
        }
        a, button, input, .cursor-pointer {
          cursor: none;
        }
      `}</style>
    </div>
  );
} 