"use client";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LoadingScreen from '@/components/LoadingScreen';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  
  // Check if the user is authenticated
  if (status === 'loading') {
    return <LoadingScreen />;
  }
  
  if (status === 'unauthenticated') {
    redirect('/login');
  }
  
  // Get the user's role from session
  const userRole = session?.user?.role || 'candidate';
  
  // Validate that role is one of the allowed types
  const userType = (userRole === 'employer') ? 'employer' : 'candidate';
  
  return (
    <DashboardLayout userType={userType as 'candidate' | 'employer'}>
      {children}
    </DashboardLayout>
  );
} 