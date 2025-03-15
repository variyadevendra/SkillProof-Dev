"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  AcademicCapIcon, 
  BoltIcon, 
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const features = [
    {
      title: "Skill Validation Challenges",
      description: "Employers post customized, skill-specific challenges. Candidates submit solutions directly on the platform.",
      icon: AcademicCapIcon,
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "AI-Driven Assessment",
      description: "Automated scoring and detailed analysis of candidate submissions with immediate, unbiased evaluation.",
      icon: SparklesIcon,
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Live Project Demonstrations",
      description: "Real-time project showcases by candidates where employers can interact and validate authenticity instantly.",
      icon: BoltIcon,
      color: "from-orange-400 to-pink-500",
    },
    {
      title: "Anonymous Candidate Profiles",
      description: "Initial candidate identities hidden to eliminate biases, highlighting only verified skills and projects.",
      icon: UserGroupIcon,
      color: "from-green-400 to-cyan-500",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Our platform replaces outdated resumes with a modern, skills-first approach to hiring
          </motion.p>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 