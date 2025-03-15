"use client";

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Only run after initial mount
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  useEffect(() => {
    // Don't run during SSR or before mount
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
    
    // Mouse position for interactivity
    const mouse = new THREE.Vector2();
    let mouseX = 0;
    let mouseY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleSpeeds = new Float32Array(particlesCount);
    const particleSizes = new Float32Array(particlesCount);
    
    // Generate particle attributes
    for (let i = 0; i < particlesCount; i++) {
      // Position
      const x = (Math.random() - 0.5) * window.innerWidth * 0.5;
      const y = (Math.random() - 0.5) * window.innerHeight * 0.5;
      const z = (Math.random() - 0.5) * 50;
      
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
      
      // Speed (for movement)
      particleSpeeds[i] = 0.1 + Math.random() * 0.2;
      
      // Size variation
      particleSizes[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('speed', new THREE.BufferAttribute(particleSpeeds, 1));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    // Create custom shader material for particles
    const particlesMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float speed;
        attribute float size;
        varying vec3 vColor;
        
        void main() {
          vColor = vec3(0.4 + size * 0.3, 0.2 + size * 0.2, 0.8 + size * 0.2); // Indigo to purple gradient
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * 2.0 * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create circular particle
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          
          gl_FragColor = vec4(vColor, strength);
        }
      `
    });
    
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Set camera position
    camera.position.z = 30;
    
    // Event listeners
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.01;
      mouseY = (event.clientY - windowHalfY) * 0.01;
      
      // Update mouse position for shaders
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    
    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Gently move the particle system based on mouse
      particleSystem.rotation.y = mouseX * 0.05 + elapsedTime * 0.02;
      particleSystem.rotation.x = mouseY * 0.05;
      
      // Update particle positions
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      const speeds = particlesGeometry.attributes.speed.array as Float32Array;
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        
        // Get current y position
        let y = positions[i3 + 1];
        
        // Apply flow effect
        y -= speeds[i] * 0.2;
        
        // Wrap around when particles go below the screen
        if (y < -window.innerHeight * 0.25) {
          y = window.innerHeight * 0.25;
          // Randomize x and z when wrapping
          positions[i3] = (Math.random() - 0.5) * window.innerWidth * 0.5;
          positions[i3 + 2] = (Math.random() - 0.5) * 50;
        }
        
        // Update position
        positions[i3 + 1] = y;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup - important for proper garbage collection
    return () => {
      // Stop animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      // Remove event listeners
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      
      // Clean up Three.js resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      
      // Clear scene
      scene.clear();
    };
  }, [mounted]); // Only re-run if mounted state changes
  
  // Return null during SSR to avoid hydration issues
  if (typeof window === 'undefined' || !mounted) {
    return null;
  }
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
} 