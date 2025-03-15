import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import Submission from '@/models/Submission';
import Challenge from '@/models/Challenge';

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
    
    // Fetch activity based on user type
    if (userType === 'candidate') {
      const userId = (session.user as any).id;
      
      // Get recent submissions by the user
      const recentSubmissions = await Submission.find({ userId })
        .sort({ submittedAt: -1 })
        .limit(5)
        .populate({
          path: 'challengeId',
          select: 'title'
        })
        .lean();
      
      // Format the submissions for the frontend
      const activityData = await Promise.all(recentSubmissions.map(async (submission) => {
        // Calculate relative time (e.g., "2 days ago")
        const submissionDate = new Date(submission.submittedAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - submissionDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        let dateText;
        if (diffDays === 0) {
          const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
          if (diffHours === 0) {
            dateText = 'Just now';
          } else {
            dateText = `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
          }
        } else if (diffDays === 1) {
          dateText = 'Yesterday';
        } else if (diffDays < 7) {
          dateText = `${diffDays} days ago`;
        } else if (diffDays < 30) {
          const diffWeeks = Math.floor(diffDays / 7);
          dateText = `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
        } else {
          dateText = submissionDate.toLocaleDateString();
        }
        
        return {
          title: submission.challengeId.title,
          status: submission.status,
          date: dateText,
          score: submission.score ? `${submission.score}%` : 'Pending'
        };
      }));
      
      return NextResponse.json(activityData);
    } else {
      const userId = (session.user as any).id;
      
      // Get recent submissions to challenges created by this employer
      const recentSubmissions = await Submission.find({ challengeCreatedBy: userId })
        .sort({ submittedAt: -1 })
        .limit(5)
        .populate([
          {
            path: 'challengeId',
            select: 'title'
          },
          {
            path: 'userId',
            select: 'name'
          }
        ])
        .lean();
      
      // Format the submissions for the frontend
      const activityData = await Promise.all(recentSubmissions.map(async (submission) => {
        // Calculate relative time
        const submissionDate = new Date(submission.submittedAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - submissionDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        let dateText;
        if (diffDays === 0) {
          const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
          dateText = `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffDays === 1) {
          dateText = 'Yesterday';
        } else if (diffDays < 7) {
          dateText = `${diffDays} days ago`;
        } else {
          dateText = submissionDate.toLocaleDateString();
        }
        
        return {
          candidate: submission.userId.name,
          challenge: submission.challengeId.title,
          status: submission.status === 'Submitted' ? 'Pending Review' : submission.status,
          time: dateText,
          score: submission.score ? `${submission.score}%` : undefined
        };
      }));
      
      return NextResponse.json(activityData);
    }
  } catch (error) {
    console.error('Error fetching dashboard activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard activity' },
      { status: 500 }
    );
  }
} 