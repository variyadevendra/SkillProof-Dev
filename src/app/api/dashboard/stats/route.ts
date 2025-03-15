import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import Challenge from '@/models/Challenge';
import Submission from '@/models/Submission';
import Interview from '@/models/Interview';

export async function GET(request: Request) {
  try {
    // Get session for authentication
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const userType = searchParams.get('userType') || 'candidate';
    
    // Connect to database
    await dbConnect();
    
    // Fetch stats based on user type
    if (userType === 'candidate') {
      // For candidates, get completed challenges, upcoming interviews, skill progress, pending submissions
      const userId = (session.user as any).id; // Assuming id is available in the session
      
      const [
        completedChallenges,
        upcomingInterviews,
        pendingSubmissions,
        userSkills
      ] = await Promise.all([
        // Count completed challenges for this user
        Submission.countDocuments({ 
          userId, 
          status: 'Completed'
        }),
        
        // Get upcoming interviews for this user
        Interview.find({ 
          candidateId: userId,
          date: { $gte: new Date() } 
        })
        .sort({ date: 1 })
        .limit(2)
        .lean(),
        
        // Count pending submissions
        Submission.countDocuments({ 
          userId, 
          status: { $in: ['Submitted', 'In Review'] } 
        }),
        
        // Get user's skills with progress
        User.findById(userId).select('skills').lean()
      ]);
      
      // Calculate skill growth (this would typically involve more complex calculations)
      // Here we're just returning a placeholder value
      const skillGrowth = 12; // Percentage
      
      return NextResponse.json({
        completedChallenges,
        upcomingInterviews,
        pendingSubmissions,
        skillGrowth,
        topSkill: userSkills?.skills?.length ? userSkills.skills[0].name : 'React Development'
      });
    } else {
      // For employers, get active challenges, pending reviews, interview requests, top candidates
      const userId = (session.user as any).id;
      
      const [
        activeChallenges,
        pendingReviews,
        interviewRequests,
        totalSubmissions
      ] = await Promise.all([
        // Count active challenges created by this employer
        Challenge.countDocuments({ 
          createdBy: userId,
          status: 'Active'
        }),
        
        // Count submissions pending review
        Submission.countDocuments({
          challengeCreatedBy: userId,
          status: 'Submitted'
        }),
        
        // Count pending interview requests
        Interview.countDocuments({
          employerId: userId,
          status: 'Requested'
        }),
        
        // Count total submissions to this employer's challenges
        Submission.countDocuments({
          challengeCreatedBy: userId
        })
      ]);
      
      // In a real scenario, we'd have an algorithm to determine top candidates
      // For now, we're using a placeholder
      const topCandidates = 8;
      
      return NextResponse.json({
        activeChallenges,
        pendingReviews,
        interviewRequests,
        totalSubmissions,
        topCandidates
      });
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
} 