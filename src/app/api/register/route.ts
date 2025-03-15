import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { registerSchema } from '@/lib/validations';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate the input with Zod
    const validatedData = registerSchema.parse(body);
    
    // Connect to the database
    await dbConnect();
    
    // Check if email already exists
    const emailExists = await User.findOne({ email: validatedData.email.toLowerCase() });
    if (emailExists) {
      return NextResponse.json(
        { success: false, message: 'Email already in use' },
        { status: 400 }
      );
    }
    
    // Check if username already exists
    const usernameExists = await User.findOne({ username: validatedData.username });
    if (usernameExists) {
      return NextResponse.json(
        { success: false, message: 'Username already taken' },
        { status: 400 }
      );
    }
    
    // Create the user
    const user = await User.create({
      username: validatedData.username,
      email: validatedData.email.toLowerCase(),
      password: validatedData.password,
      name: validatedData.name,
      role: validatedData.role || 'candidate',
    });
    
    // Return success without exposing password
    const { password, ...userWithoutPassword } = user.toObject();
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'User registered successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error', 
          errors: error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { success: false, message: 'Failed to register user' },
      { status: 500 }
    );
  }
} 