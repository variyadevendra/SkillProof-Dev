"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  AcademicCapIcon, 
  BoltIcon, 
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import FeatureCard3D from './FeatureCard3D';

export default function EnhancedFeatures() {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [subtitleRef, subtitleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const features = [
    {
      title: "Skill Validation Challenges",
      description: "Employers post customized, skill-specific challenges. Candidates submit solutions directly on the platform.",
      icon: <AcademicCapIcon className="w-6 h-6 text-white" />,
      color: "indigo",
    },
    {
      title: "AI-Driven Assessment",
      description: "Automated scoring and detailed analysis of candidate submissions with immediate, unbiased evaluation.",
      icon: <SparklesIcon className="w-6 h-6 text-white" />,
      color: "purple",
    },
    {
      title: "Live Project Demonstrations",
      description: "Real-time project showcases by candidates where employers can interact and validate authenticity instantly.",
      icon: <BoltIcon className="w-6 h-6 text-white" />,
      color: "pink",
    },
    {
      title: "Anonymous Candidate Profiles",
      description: "Initial candidate identities hidden to eliminate biases, highlighting only verified skills and projects.",
      icon: <UserGroupIcon className="w-6 h-6 text-white" />,
      color: "indigo",
    },
  ];

  // Animations for the title
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

  const titleText = "How It Works";
  const titleArray = titleText.split('');

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-indigo-50 -z-10" />
      
      {/* Background circles */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-indigo-100 rounded-full opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20 relative">
          {/* Animated title with letter-by-letter animation */}
          <div ref={titleRef} className="overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 inline-block">
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

          {/* Subtitle with animated underline */}
          <div ref={subtitleRef} className="relative inline-block">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={subtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Our platform replaces outdated resumes with a modern, skills-first approach to hiring
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={subtitleInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard3D
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 