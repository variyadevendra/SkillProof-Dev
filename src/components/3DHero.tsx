"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values based on scroll position
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Only run after initial mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Handle 3D animation - only run client-side after mount
  useEffect(() => {
    if (typeof window === 'undefined' || !mounted || !canvasRef.current) return;
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create a group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(1, 2, 3);
    scene.add(directionalLight);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 7;
      
      // Color - gradient from indigo to purple
      if (i % 3 === 0) {
        colorArray[i] = 0.4 + Math.random() * 0.2; // R
        colorArray[i + 1] = 0.2 + Math.random() * 0.1; // G
        colorArray[i + 2] = 0.8 + Math.random() * 0.2; // B
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particlesMesh);
    
    // Add floating geometric shapes
    const addShape = (geometry: THREE.BufferGeometry, color: string, position: THREE.Vector3, rotation: THREE.Euler) => {
      const material = new THREE.MeshPhysicalMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        metalness: 0.3,
        roughness: 0.1,
        emissive: new THREE.Color(color).multiplyScalar(0.2),
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.rotation.copy(rotation);
      group.add(mesh);
      return mesh;
    };
    
    const shapes: THREE.Mesh[] = [];
    
    // Add icosahedron (20-sided shape)
    shapes.push(
      addShape(
        new THREE.IcosahedronGeometry(0.6, 0),
        '#4f46e5', // indigo
        new THREE.Vector3(-1.5, 0.5, -1),
        new THREE.Euler(0, 0, 0)
      )
    );
    
    // Add dodecahedron (12-sided shape)
    shapes.push(
      addShape(
        new THREE.DodecahedronGeometry(0.5, 0),
        '#7c3aed', // purple
        new THREE.Vector3(1.5, -0.5, -1),
        new THREE.Euler(0, 0, 0)
      )
    );
    
    // Add octahedron (8-sided shape)
    shapes.push(
      addShape(
        new THREE.OctahedronGeometry(0.4, 0),
        '#ec4899', // pink
        new THREE.Vector3(0, 1, -0.5),
        new THREE.Euler(0, 0, 0)
      )
    );
    
    // Add torus (donut shape)
    shapes.push(
      addShape(
        new THREE.TorusGeometry(0.4, 0.15, 16, 32),
        '#0ea5e9', // sky blue
        new THREE.Vector3(0, -1, -0.5),
        new THREE.Euler(Math.PI / 2, 0, 0)
      )
    );
    
    // Position camera
    camera.position.z = 2.5;
    
    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Smoothly move to target
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      
      // Rotate entire group based on mouse position
      group.rotation.y += 0.05 * (targetX - group.rotation.y);
      group.rotation.x += 0.05 * (targetY - group.rotation.x);
      
      // Animate particles
      particlesMesh.rotation.y = elapsedTime * 0.05;
      
      // Animate shapes
      shapes.forEach((shape, i) => {
        const speed = 0.2 + (i * 0.1);
        const amplitude = 0.1 + (i * 0.05);
        
        shape.position.y += Math.sin(elapsedTime * speed) * amplitude * 0.03;
        shape.rotation.x += 0.005;
        shape.rotation.y += 0.01;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    setLoaded(true);
    
    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      // Clean up Three.js resources
      shapes.forEach(shape => {
        if (shape.geometry) shape.geometry.dispose();
        if (shape.material) {
          if (Array.isArray(shape.material)) {
            shape.material.forEach(m => m.dispose());
          } else {
            shape.material.dispose();
          }
        }
      });
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      
      // Clear scene and remove listeners
      scene.clear();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
    };
  }, [mounted]);
  
  // Text animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(79, 70, 229, 0.4)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // During SSR or before mount, render a placeholder
  const renderCanvas = mounted ? (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full -z-5"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  ) : null;
  
  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* 3D Background canvas - only client side */}
      {renderCanvas}
      
      {/* Content overlaid on 3D background */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 py-10"
      >
        {/* Subtle text backdrop for better readability */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-3xl shadow-sm"></div>
        
        <motion.h1 
          className="relative text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6"
          variants={headerVariants}
          initial="hidden"
          animate={loaded && mounted ? "visible" : "hidden"}
        >
          Validate. Demonstrate.
          <br /> 
          <span className="text-gray-900">Get Hired.</span>
        </motion.h1>
        
        <motion.p 
          className="relative text-xl md:text-2xl text-gray-700 max-w-2xl mb-10"
          variants={paragraphVariants}
          initial="hidden"
          animate={loaded && mounted ? "visible" : "hidden"}
        >
          The future of technical hiring where skills not resumes unlock your next opportunity.
        </motion.p>
        
        <div className="relative flex flex-col sm:flex-row gap-4">
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate={loaded && mounted ? "visible" : "hidden"}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/register"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-lg inline-block shadow-md hover:shadow-lg transition-all"
            >
              Get Started
            </Link>
          </motion.div>
          
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate={loaded && mounted ? "visible" : "hidden"}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/demo"
              className="px-8 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm text-gray-800 font-medium text-lg inline-block shadow-sm hover:shadow-md transition-all"
            >
              View Demo
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
            animate={{ 
              y: [0, 8, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="w-1 h-2 bg-gray-600 rounded-full"
              animate={{ 
                height: [8, 4, 8],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 