import { z } from 'zod';

// Registration schema
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be less than 20 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' }),
  
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .toLowerCase(),
  
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(100, { message: 'Password must be less than 100 characters' }),
  
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be less than 100 characters' })
    .optional(),
});

// Login schema
export const loginSchema = z.object({
  // This can be either email or username
  identifier: z
    .string()
    .min(1, { message: 'Email or username is required' }),
  
  password: z
    .string()
    .min(1, { message: 'Password is required' }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>; 