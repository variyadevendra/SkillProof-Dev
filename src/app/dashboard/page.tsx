"use client";

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  CalendarIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { useDashboardStats, useDashboardActivity, useUpcomingSchedule, useSkillGrowth } from '@/lib/api';

// Animation variants
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

export default function Dashboard() {
  const { data: session } = useSession();
  const userType = session?.user?.role || 'candidate';
  
  // Determine if we should show the candidate or employer dashboard
  return userType === 'employer' ? <EmployerDashboard /> : <CandidateDashboard />;
}

function CandidateDashboard() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  
  // Use SWR hooks to fetch data
  const { data: statsData, isLoading: statsLoading, isError: statsError } = useDashboardStats('candidate');
  const { data: activityData, isLoading: activityLoading, isError: activityError } = useDashboardActivity('candidate');
  const { data: scheduleData, isLoading: scheduleLoading, isError: scheduleError } = useUpcomingSchedule();
  const { data: skillGrowthData, isLoading: skillGrowthLoading, isError: skillGrowthError } = useSkillGrowth(timeframe);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome section */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Candidate!</h2>
            <p className="text-gray-600 mt-1">Here's what's happening with your skill journey today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/dashboard/challenges">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium transition-transform hover:scale-105">
                Start New Challenge
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Stats overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-full">
              <CheckCircleIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Completed Challenges</p>
              <h4 className="text-2xl font-bold text-gray-800">
                {statsLoading ? (
                  <span className="animate-pulse">...</span>
                ) : statsError ? (
                  <span className="text-red-500">Error</span>
                ) : (
                  statsData?.completedChallenges || 0
                )}
              </h4>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full" 
                style={{ 
                  width: statsLoading ? '0%' : statsError ? '0%' : '65%' 
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">65% of your monthly goal</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Upcoming Interviews</p>
              <h4 className="text-2xl font-bold text-gray-800">
                {statsLoading ? (
                  <span className="animate-pulse">...</span>
                ) : statsError ? (
                  <span className="text-red-500">Error</span>
                ) : (
                  statsData?.upcomingInterviews?.length || 0
                )}
              </h4>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Next: {statsLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : statsError ? (
                <span className="text-red-500">Unavailable</span>
              ) : statsData?.upcomingInterviews?.length > 0 ? (
                <span className="font-medium">
                  {new Date(statsData.upcomingInterviews[0].date).toLocaleString('en-US', {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </span>
              ) : (
                <span className="text-gray-400">No upcoming interviews</span>
              )}
            </p>
            <Link href="/dashboard/interviews" className="text-purple-600 hover:underline text-xs mt-1 inline-block">
              View schedule
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Skill Progress</p>
              <h4 className="text-2xl font-bold text-gray-800">
                {statsLoading ? (
                  <span className="animate-pulse">...</span>
                ) : statsError ? (
                  <span className="text-red-500">Error</span>
                ) : (
                  `+${statsData?.skillGrowth || 0}%`
                )}
              </h4>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              Top skill: <span className="font-medium text-gray-700">
                {statsLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : statsError ? (
                  <span className="text-red-500">Unavailable</span>
                ) : (
                  statsData?.topSkill || 'React Development'
                )}
              </span>
            </p>
            <Link href="/dashboard/profile" className="text-green-600 hover:underline text-xs mt-1 inline-block">
              View skill profile
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <BriefcaseIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Submissions</p>
              <h4 className="text-2xl font-bold text-gray-800">
                {statsLoading ? (
                  <span className="animate-pulse">...</span>
                ) : statsError ? (
                  <span className="text-red-500">Error</span>
                ) : (
                  statsData?.pendingSubmissions || 0
                )}
              </h4>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              Latest: <span className="font-medium text-gray-700">
                {activityLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : activityError ? (
                  <span className="text-red-500">Unavailable</span>
                ) : activityData?.length > 0 ? (
                  activityData[0].title
                ) : (
                  'No submissions yet'
                )}
              </span>
            </p>
            <Link href="/dashboard/submissions" className="text-orange-600 hover:underline text-xs mt-1 inline-block">
              Check status
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Recent activity and upcoming schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
            <Link href="/dashboard/submissions" className="text-sm text-indigo-600 hover:underline">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {activityLoading ? (
              // Loading state
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="w-3/4">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  </div>
                  <div className="w-1/4 flex flex-col items-end">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-16 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-10"></div>
                  </div>
                </div>
              ))
            ) : activityError ? (
              <div className="text-center py-4 text-red-500">
                Failed to load activity data
              </div>
            ) : activityData?.length ? (
              activityData.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <h4 className="font-medium text-gray-800">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'Submitted' || activity.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {activity.status}
                    </span>
                    <p className="text-sm mt-1 font-medium">{activity.score}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No recent activity found
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Schedule</h3>
            <Link href="/dashboard/calendar" className="text-sm text-indigo-600 hover:underline">
              View calendar
            </Link>
          </div>
          
          <div className="space-y-4">
            {scheduleLoading ? (
              // Loading state
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="flex items-start py-3 border-b border-gray-100 last:border-0">
                  <div className="bg-gray-200 p-2 rounded-full mr-4 animate-pulse h-9 w-9"></div>
                  <div className="w-full">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/4"></div>
                  </div>
                </div>
              ))
            ) : scheduleError ? (
              <div className="text-center py-4 text-red-500">
                Failed to load schedule data
              </div>
            ) : scheduleData?.length ? (
              scheduleData.map((event, index) => (
                <div key={index} className="flex items-start py-3 border-b border-gray-100 last:border-0">
                  <div className={`p-2 rounded-full mr-4 ${
                    event.type === 'Interview' ? 'bg-purple-100' :
                    event.type === 'Challenge Deadline' ? 'bg-red-100' :
                    event.type === 'Meeting' ? 'bg-blue-100' :
                    'bg-green-100'
                  }`}>
                    {event.type === 'Interview' ? (
                      <VideoCameraIcon className="h-5 w-5 text-purple-600" />
                    ) : event.type === 'Challenge Deadline' ? (
                      <ClockIcon className="h-5 w-5 text-red-600" />
                    ) : event.type === 'Meeting' ? (
                      <UserGroupIcon className="h-5 w-5 text-blue-600" />
                    ) : (
                      <CalendarIcon className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.time}</p>
                    <span className="inline-block text-xs mt-1 text-gray-500">{event.type}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No upcoming events found
              </div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Skill progress trends */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">Skill Growth Trends</h3>
          <div className="flex space-x-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 text-sm rounded-full ${
                  timeframe === period
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-64 w-full">
          {skillGrowthLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <div className="h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : skillGrowthError ? (
            <div className="h-full w-full flex items-center justify-center text-red-500">
              Failed to load skill growth data
            </div>
          ) : (
            <div className="flex items-end h-full w-full space-x-2">
              {(skillGrowthData || defaultSkillData[timeframe]).map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    style={{ height: `${height}%` }}
                    className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg"
                  ></div>
                  <p className="text-xs text-gray-500 mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Default skill data as fallback when API data is not available
const defaultSkillData = {
  week: [65, 40, 85, 30, 70, 55, 75],
  month: [30, 40, 45, 50, 60, 65, 70, 75, 70, 80, 85, 80],
  year: [20, 30, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85]
};

function EmployerDashboard() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome section */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Employer!</h2>
            <p className="text-gray-600 mt-1">Here's what's happening with your hiring process today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/dashboard/create-challenge">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium transition-transform hover:scale-105">
                Create New Challenge
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Stats overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-full">
              <ChartBarIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Challenges</p>
              <h4 className="text-2xl font-bold text-gray-800">5</h4>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">Total submissions: <span className="font-medium text-gray-700">28</span></p>
            <Link href="/dashboard/manage-challenges" className="text-indigo-600 hover:underline text-xs mt-1 inline-block">
              Manage challenges
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Reviews</p>
              <h4 className="text-2xl font-bold text-gray-800">12</h4>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">Oldest: <span className="font-medium text-gray-700">3 days ago</span></p>
            <Link href="/dashboard/candidate-submissions" className="text-purple-600 hover:underline text-xs mt-1 inline-block">
              Review submissions
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <VideoCameraIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Interview Requests</p>
              <h4 className="text-2xl font-bold text-gray-800">4</h4>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">Next: <span className="font-medium text-gray-700">Tomorrow at 2:00 PM</span></p>
            <Link href="/dashboard/interview-requests" className="text-green-600 hover:underline text-xs mt-1 inline-block">
              Manage interviews
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <UserGroupIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Top Candidates</p>
              <h4 className="text-2xl font-bold text-gray-800">8</h4>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">Match rate: <span className="font-medium text-gray-700">92%</span></p>
            <Link href="/dashboard/analytics" className="text-orange-600 hover:underline text-xs mt-1 inline-block">
              View analytics
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Recent submissions and upcoming interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Submissions</h3>
            <Link href="/dashboard/candidate-submissions" className="text-sm text-indigo-600 hover:underline">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {[
              { candidate: 'Alex Johnson', challenge: 'React Performance', status: 'Pending Review', time: '2 hours ago' },
              { candidate: 'Sarah Miller', challenge: 'API Integration', status: 'Reviewed', time: '1 day ago', score: '95%' },
              { candidate: 'David Chen', challenge: 'Code Refactoring', status: 'Pending Review', time: '2 days ago' },
              { candidate: 'Maria Garcia', challenge: 'UI Design', status: 'Reviewed', time: '3 days ago', score: '82%' },
            ].map((submission, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <h4 className="font-medium text-gray-800">{submission.candidate}</h4>
                  <p className="text-sm text-gray-500">{submission.challenge}</p>
                  <p className="text-xs text-gray-400">{submission.time}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    submission.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {submission.status}
                  </span>
                  {submission.score && (
                    <p className="text-sm mt-1 font-medium">{submission.score}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Interviews</h3>
            <Link href="/dashboard/interview-requests" className="text-sm text-indigo-600 hover:underline">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {[
              { candidate: 'Michael Brown', position: 'Senior Frontend Developer', time: 'Tomorrow, 2:00 PM' },
              { candidate: 'Emily Wilson', position: 'Full Stack Engineer', time: 'Feb 15, 10:00 AM' },
              { candidate: 'James Taylor', position: 'UI/UX Designer', time: 'Feb 16, 1:30 PM' },
              { candidate: 'Sophia Martinez', position: 'Backend Developer', time: 'Feb 18, 11:00 AM' },
            ].map((interview, index) => (
              <div key={index} className="flex items-start py-3 border-b border-gray-100 last:border-0">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <VideoCameraIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{interview.candidate}</h4>
                  <p className="text-sm text-gray-500">{interview.position}</p>
                  <p className="text-xs text-indigo-600 mt-1">{interview.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Challenge performance metrics */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">Challenge Performance</h3>
          <div className="flex space-x-2">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 text-sm rounded-full ${
                  timeframe === period
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">React Performance Challenge</p>
                <span className="text-sm text-gray-500">84% completion rate</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">API Integration Challenge</p>
                <span className="text-sm text-gray-500">76% completion rate</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Code Refactoring Challenge</p>
                <span className="text-sm text-gray-500">92% completion rate</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-green-600 h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">UI Design Challenge</p>
                <span className="text-sm text-gray-500">68% completion rate</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-orange-600 h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Overview</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your challenges have an average completion rate of 80%, which is above the platform average of 72%.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500">Average Score</p>
                <p className="text-xl font-bold text-indigo-600">87%</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500">Total Submissions</p>
                <p className="text-xl font-bold text-purple-600">248</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500">Match Rate</p>
                <p className="text-xl font-bold text-green-600">62%</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500">Hiring Conversion</p>
                <p className="text-xl font-bold text-orange-600">18%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Add missing components referenced above
function VideoCameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
    </svg>
  )
} 