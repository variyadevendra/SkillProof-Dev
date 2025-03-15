"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
    setMounted(true);
    
    return () => setMounted(false);
  }, [isInView, controls]);
  
  // 3D floating object effect
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(200, 200);
    camera.position.z = 5;
    
    // Create a torus knot
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 128, 32, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x7c3aed, // Adjusted to purple-600
      metalness: 0.2,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.5,
      ior: 1.5,
      emissive: 0x8b5cf6, // Adjusted to purple-500
      emissiveIntensity: 0.3,
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    // Add lights
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);
    
    const light2 = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    light2.position.set(-1, -1, -1);
    scene.add(light2);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [mounted]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Company logos
  const companyLogos = [
    { name: "TECHCORP", delay: 0 },
    { name: "INNOVATE INC", delay: 0.1 },
    { name: "FUTURE SYSTEMS", delay: 0.2 },
    { name: "NEXUS GROUP", delay: 0.3 },
    { name: "QUANTUM LABS", delay: 0.4 },
  ];
  
  return (
    <section 
      id="cta" 
      ref={sectionRef} 
      className="py-20 relative overflow-hidden bg-indigo-50/50"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.div 
          className="relative z-10"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Main content with 3D object */}
          <div className="rounded-3xl bg-white/90 backdrop-blur-sm shadow-md overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center gap-6 p-8 md:p-12">
              <div className="flex-1">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold mb-6 text-indigo-500"
                  variants={itemVariants}
                >
                  Ready to Transform
                  <br />
                  <span className="text-purple-600">Your Hiring Process?</span>
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-gray-600 mb-8"
                  variants={itemVariants}
                >
                  Join hundreds of companies already using SkillProof to find the best talent based on real skills, not just resumes.
                </motion.p>
                
                <motion.div variants={itemVariants}>
                  <Link 
                    href="/register"
                    className="px-8 py-4 bg-indigo-500 text-white font-semibold text-lg rounded-lg inline-block transition-all hover:bg-indigo-600"
                  >
                    Sign Up for Free
                  </Link>
                  
                  <motion.p className="text-sm text-gray-500 mt-4" variants={itemVariants}>
                    No credit card required • 14-day free trial • Cancel anytime
                  </motion.p>
                </motion.div>
              </div>
              
              {/* 3D effect */}
              <div className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full blur-3xl bg-purple-400/20"></div>
                
                {/* Floating circles */}
                <motion.div 
                  className="absolute w-3 h-3 rounded-full bg-purple-400"
                  animate={{ 
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut" 
                  }}
                  style={{ top: '15%', right: '15%' }}
                />
                
                <motion.div 
                  className="absolute w-2 h-2 rounded-full bg-indigo-400"
                  animate={{ 
                    x: [0, -10, 0],
                    y: [0, 10, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  style={{ bottom: '20%', left: '20%' }}
                />
                
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full"
                />
              </div>
            </div>
            
            {/* Company logos section */}
            <div className="border-t border-gray-100 py-6 px-8 text-center">
              <motion.p 
                className="text-sm text-gray-500 mb-4"
                variants={itemVariants}
              >
                Trusted by leading companies worldwide
              </motion.p>
              
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {companyLogos.map((logo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: logo.delay + 0.5, duration: 0.5 }}
                    className="text-gray-400 font-semibold text-sm"
                  >
                    {logo.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 