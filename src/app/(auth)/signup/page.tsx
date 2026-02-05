import { SignupForm } from '@/components/auth/signup-form';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Code } from 'lucide-react';

// Check if we're in demo mode
const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function SignupPage() {
  // In demo mode, redirect to dashboard
  if (isDemoMode) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600">
          <Code className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Vibe Coding Academy
        </span>
      </Link>

      <SignupForm />
    </div>
  );
}
