import { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';
import LoginIllustration from '@/components/LoginIllustration';

export const metadata: Metadata = {
  title: 'Sign In | SkillProof',
  description: 'Sign in to your SkillProof account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Animated Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-purple-300 relative overflow-hidden">
        <div className="flex items-center justify-center w-full h-full">
          <LoginIllustration />
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="absolute top-4 right-4">
            <p className="text-sm text-gray-600">
              Not a member? <Link href="/register" className="text-blue-500 font-medium">Register now</Link>
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 