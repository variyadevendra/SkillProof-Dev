import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
import Interview from '@/models/Interview';
import Challenge from '@/models/Challenge';
import Submission from '@/models/Submission';

export async function GET(request: Request) {
  try {
    // Get session for authentication
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await dbConnect();
    
    const userId = (session.user as any).id;
    const userRole = (session.user as any).role || 'candidate';
    
    // Get current date
    const now = new Date();
    
    if (userRole === 'candidate') {
      // Get upcoming events for a candidate
      const [upcomingInterviews, challengeDeadlines, feedbackSessions, liveEvents] = await Promise.all([
        // Upcoming interviews
        Interview.find({
          candidateId: userId,
          date: { $gte: now },
          status: { $in: ['Scheduled', 'Requested'] }
        })
        .sort({ date: 1 })
        .limit(3)
        .select('position company date type')
        .lean(),
        
        // Submission deadlines for challenges in progress
        Challenge.find({
          status: 'Active',
          // Here you would add logic to find challenges that the user has started but not completed
          // This is a simplified example
        })
        .sort({ createdAt: 1 })
        .limit(2)
        .select('title estimatedTime')
        .lean(),
        
        // Scheduled feedback sessions
        Interview.find({
          candidateId: userId,
          type: 'Feedback',
          date: { $gte: now }
        })
        .sort({ date: 1 })
        .limit(1)
        .select('position date')
        .lean(),
        
        // Live coding events/contests
        // This would be from another collection in a real app
        // For now we'll create a placeholder
        []
      ]);
      
      // Format all events uniformly
      const events = [
        ...upcomingInterviews.map(interview => ({
          title: `Mock Interview: ${interview.position}`,
          type: 'Interview',
          time: formatDate(interview.date)
        })),
        
        ...challengeDeadlines.map(challenge => ({
          title: challenge.title,
          type: 'Challenge Deadline',
          time: `Due in ${challenge.estimatedTime}`
        })),
        
        ...feedbackSessions.map(session => ({
          title: `Feedback Session: ${session.position}`,
          type: 'Meeting',
          time: formatDate(session.date)
        }))
      ];
      
      // Add a placeholder event for illustration (would come from real data)
      events.push({
        title: 'JavaScript Algorithm Contest',
        type: 'Live Event',
        time: 'Feb 22, 6:00 PM'
      });
      
      // Sort events by estimated time
      events.sort((a, b) => {
        const dateA = parseAmbiguousDate(a.time);
        const dateB = parseAmbiguousDate(b.time);
        return dateA.getTime() - dateB.getTime();
      });
      
      return NextResponse.json(events.slice(0, 4)); // Return top 4 events
    } else {
      // Get upcoming events for an employer
      const upcomingInterviews = await Interview.find({
        employerId: userId,
        date: { $gte: now },
        status: { $in: ['Scheduled', 'Requested'] }
      })
      .sort({ date: 1 })
      .limit(4)
      .populate({
        path: 'candidateId',
        select: 'name'
      })
      .select('position date')
      .lean();
      
      // Format interviews for display
      const events = upcomingInterviews.map(interview => ({
        candidate: interview.candidateId.name,
        position: interview.position,
        time: formatDate(interview.date)
      }));
      
      return NextResponse.json(events);
    }
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schedule' },
      { status: 500 }
    );
  }
}

// Helper function to format dates consistently
function formatDate(date: Date): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (isSameDay(date, now)) {
    return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (isSameDay(date, tomorrow)) {
    return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
}

// Helper function to check if two dates are the same day
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Helper function to parse various date formats for sorting
function parseAmbiguousDate(dateStr: string): Date {
  if (dateStr.startsWith('Today')) {
    const time = dateStr.split(', ')[1];
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date;
  } else if (dateStr.startsWith('Tomorrow')) {
    const time = dateStr.split(', ')[1];
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date;
  } else if (dateStr.startsWith('Due in')) {
    // For "Due in X hours", we'll set a date hours from now
    const hoursMatch = dateStr.match(/(\d+)\s+hours?/);
    if (hoursMatch) {
      const hours = parseInt(hoursMatch[1]);
      const date = new Date();
      date.setHours(date.getHours() + hours);
      return date;
    }
    return new Date(); // Fallback
  } else {
    // Try to parse a date like "Feb 15, 10:00 AM"
    return new Date(dateStr);
  }
} 