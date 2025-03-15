"use client";

import { useEffect, useState } from 'react';
import CustomCursor from './CustomCursor';
import ParticleBackground from './ParticleBackground';

export default function ClientComponents() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // This ensures components only render after hydration is complete
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return null; // Return nothing during server-side rendering
  }
  
  return (
    <>
      <CustomCursor />
      <ParticleBackground />
    </>
  );
} 