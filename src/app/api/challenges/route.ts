import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/dbConnect';
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
    const type = searchParams.get('type');
    const skill = searchParams.get('skill');
    const difficulty = searchParams.get('difficulty');
    const search = searchParams.get('search');
    
    // Build the filter object
    const filter: any = {};
    
    if (type) {
      filter.type = type;
    }
    
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    
    if (skill) {
      filter.skills = skill;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Only fetch active challenges
    filter.status = 'Active';
    
    // Connect to database
    await dbConnect();
    
    // Fetch challenges with pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Execute query with efficient field selection
    const [challenges, total] = await Promise.all([
      Challenge.find(filter)
        .select('title description type skills difficulty estimatedTime completions averageRating')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Challenge.countDocuments(filter)
    ]);
    
    // Return challenges with pagination metadata
    return NextResponse.json({
      challenges,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenges' },
      { status: 500 }
    );
  }
} 