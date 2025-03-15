import { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from '@/components/RegisterForm';
import RegisterIllustration from '@/components/RegisterIllustration';

export const metadata: Metadata = {
  title: 'Create Account | SkillProof',
  description: 'Create a new SkillProof account to find the best talent',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Animated Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-purple-300 relative overflow-hidden">
        <div className="flex items-center justify-center w-full h-full">
          <RegisterIllustration />
        </div>
      </div>
      
      {/* Right side - Registration form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="absolute top-4 right-4">
            <p className="text-sm text-gray-600">
              Already a member? <Link href="/login" className="text-blue-500 font-medium">Login</Link>
            </p>
          </div>
          
          <RegisterForm />
        </div>
      </div>
    </div>
  );
} 