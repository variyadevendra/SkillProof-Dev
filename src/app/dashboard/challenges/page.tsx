"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  AdjustmentsHorizontalIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  CheckCircleIcon,
  TagIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { useChallenges } from '@/lib/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Challenge types and skill categories
const challengeTypes = ['All Types', 'Algorithm', 'Project', 'Bug Fixing', 'System Design', 'API Integration'];
const skillCategories = ['All Skills', 'JavaScript', 'React', 'Node.js', 'Python', 'Data Structures', 'CSS', 'System Architecture'];
const difficultyLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function ChallengesPage() {
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedSkill, setSelectedSkill] = useState('All Skills');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  
  // Use SWR hook to fetch challenges data with filters
  const { data, isLoading, isError, mutate } = useChallenges({
    type: selectedType !== 'All Types' ? selectedType : undefined,
    skill: selectedSkill !== 'All Skills' ? selectedSkill : undefined,
    difficulty: selectedDifficulty !== 'All Levels' ? selectedDifficulty : undefined,
    search: searchQuery || undefined
  });
  
  // Extract challenges and pagination from the response
  const challenges = data?.challenges || [];
  const pagination = data?.pagination;
  
  // Handler for filter changes
  const handleFilterChange = () => {
    setPage(1); // Reset to first page on filter change
    mutate(); // Refetch data with new filters
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page header */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Skill Challenges</h2>
            <p className="text-gray-600 mt-1">Browse and take on challenges to validate and improve your skills.</p>
          </div>
        </div>
      </motion.div>
      
      {/* Search and filters */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleFilterChange()}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <select
                className="px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent appearance-none bg-white"
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  handleFilterChange();
                }}
              >
                {challengeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent appearance-none bg-white"
                value={selectedSkill}
                onChange={(e) => {
                  setSelectedSkill(e.target.value);
                  handleFilterChange();
                }}
              >
                {skillCategories.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <TagIcon className="h-5 w-5" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent appearance-none bg-white"
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  handleFilterChange();
                }}
              >
                {difficultyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <StarIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Challenge cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading state with skeleton cards
          Array(6).fill(0).map((_, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-full animate-pulse w-16"></div>
                </div>
                
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-14"></div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                </div>
                
                <div className="mt-6">
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-full"></div>
                </div>
              </div>
            </motion.div>
          ))
        ) : isError ? (
          <motion.div
            variants={itemVariants}
            className="col-span-full bg-white p-8 rounded-xl shadow-sm text-center"
          >
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-700">Error loading challenges</h3>
              <p className="mt-2 text-gray-500">There was a problem retrieving the challenges.</p>
              <button
                onClick={() => mutate()}
                className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                Try again
              </button>
            </div>
          </motion.div>
        ) : challenges.length > 0 ? (
          challenges.map(challenge => (
            <motion.div 
              key={challenge._id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-800">{challenge.title}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    challenge.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    challenge.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                    challenge.difficulty === 'Advanced' ? 'bg-purple-100 text-purple-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{challenge.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {challenge.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                  {challenge.skills.length > 3 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      +{challenge.skills.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{challenge.estimatedTime}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    <span>{challenge.completions} completions</span>
                  </div>
                  
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>{challenge.averageRating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link href={`/dashboard/challenges/${challenge._id}`}>
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 transition-colors">
                      Start Challenge
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={itemVariants}
            className="col-span-full bg-white p-8 rounded-xl shadow-sm text-center"
          >
            <div className="flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-700">No challenges found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your filters or search query.</p>
              <button
                onClick={() => {
                  setSelectedType('All Types');
                  setSelectedSkill('All Skills');
                  setSelectedDifficulty('All Levels');
                  setSearchQuery('');
                  handleFilterChange();
                }}
                className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                Reset filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex justify-center items-center mt-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg ${
                page === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                // Calculate page numbers to display
                const pagesBefore = 2;
                const pagesAfter = 2;
                let pageNum;
                
                if (pagination.pages <= 5) {
                  // If total pages are 5 or fewer, display all pages
                  pageNum = i + 1;
                } else if (page <= pagesBefore + 1) {
                  // Near start of pages
                  pageNum = i + 1;
                } else if (page >= pagination.pages - pagesAfter) {
                  // Near end of pages
                  pageNum = pagination.pages - 4 + i;
                } else {
                  // Middle pages
                  pageNum = page - pagesBefore + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                      pageNum === page 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setPage(Math.min(pagination.pages, page + 1))}
              disabled={page === pagination.pages}
              className={`px-4 py-2 rounded-lg ${
                page === pagination.pages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
} 