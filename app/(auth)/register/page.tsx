import { RegisterForm } from '@/components/forms/register-form';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-gray-600">Get started with your account</p>
      </div>
      
      <RegisterForm />
      
      <div className="text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <Link 
          href="/login" 
          className="text-blue-600 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}