"use client";

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { 
  HomeIcon, 
  PuzzlePieceIcon, 
  DocumentTextIcon, 
  VideoCameraIcon,
  UserCircleIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  BeakerIcon,
  ClipboardDocumentCheckIcon,
  PresentationChartLineIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

// Define tab interfaces
interface TabItem {
  name: string;
  path: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

// Candidate dashboard tabs
const candidateTabs: TabItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Challenges', path: '/dashboard/challenges', icon: PuzzlePieceIcon },
  { name: 'My Submissions', path: '/dashboard/submissions', icon: DocumentTextIcon },
  { name: 'Mock Interviews', path: '/dashboard/interviews', icon: VideoCameraIcon },
  { name: 'Skill Profile', path: '/dashboard/profile', icon: UserCircleIcon },
  { name: 'Calendar', path: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Messages', path: '/dashboard/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Settings', path: '/dashboard/settings', icon: Cog6ToothIcon },
];

// Employer dashboard tabs
const employerTabs: TabItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Create Challenge', path: '/dashboard/create-challenge', icon: BeakerIcon },
  { name: 'Manage Challenges', path: '/dashboard/manage-challenges', icon: PuzzlePieceIcon },
  { name: 'Candidate Submissions', path: '/dashboard/candidate-submissions', icon: ClipboardDocumentCheckIcon },
  { name: 'Mock Interview Requests', path: '/dashboard/interview-requests', icon: VideoCameraIcon },
  { name: 'Analytics & Reports', path: '/dashboard/analytics', icon: PresentationChartLineIcon },
  { name: 'Messages', path: '/dashboard/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Settings', path: '/dashboard/settings', icon: Cog6ToothIcon },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'candidate' | 'employer';
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  
  // Select tabs based on user type
  const tabs = userType === 'candidate' ? candidateTabs : employerTabs;
  
  // Generate initials from name
  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  // Get user info from session
  const userName = session?.user?.name || (userType === 'candidate' ? 'Candidate' : 'Employer');
  const initials = getInitials(userName);
  
  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        className="bg-white shadow-md overflow-hidden"
        initial={{ width: 280 }}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo and collapse button */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <Link href="/dashboard">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SkillProof
              </span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-gray-600 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 flex flex-col h-[calc(100%-64px)]">
          <ul className="space-y-2">
            {tabs.map((tab) => {
              const isActive = pathname === tab.path || 
                (tab.path !== '/dashboard' && pathname?.startsWith(tab.path));
              
              return (
                <li key={tab.name}>
                  <Link href={tab.path}>
                    <div
                      className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <span className="ml-3 font-medium">{tab.name}</span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Sign Out button at the bottom */}
          <div className="mt-auto mb-4">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              {!isCollapsed && (
                <span className="ml-3 font-medium">Sign Out</span>
              )}
            </button>
          </div>
        </nav>
      </motion.aside>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {pathname === '/dashboard' 
                ? 'Dashboard'
                : tabs.find(tab => pathname === tab.path || pathname?.startsWith(tab.path))?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-medium">
                  {initials}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userType === 'candidate' ? 'Candidate' : 'Employer'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 