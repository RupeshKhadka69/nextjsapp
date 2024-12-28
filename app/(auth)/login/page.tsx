import { LoginForm } from '@/components/forms/login-fom';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your account</p>
      </div>
      
      <LoginForm />
      
      <div className="text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <Link 
          href="/register" 
          className="text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
