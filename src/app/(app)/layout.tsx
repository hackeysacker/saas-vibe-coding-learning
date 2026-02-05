import { Navigation } from '@/components/shared/navigation';
import { redirect } from 'next/navigation';

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If Supabase is not configured, show a demo mode
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Navigation
          user={{
            name: 'Demo User',
            email: 'demo@example.com',
            avatar_url: null,
          }}
        />
        <main className="pt-16">{children}</main>
      </div>
    );
  }

  // Dynamic import to avoid errors when env vars are missing
  const { createClient } = await import('@/lib/supabase/server');

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login');
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    const handleSignOut = async () => {
      'use server';
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      await supabase.auth.signOut();
      redirect('/');
    };

    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Navigation
          user={
            profile
              ? {
                  name: profile.name,
                  email: profile.email,
                  avatar_url: profile.avatar_url,
                }
              : {
                  name: user.email?.split('@')[0] || 'User',
                  email: user.email || '',
                  avatar_url: null,
                }
          }
          onSignOut={handleSignOut}
        />
        <main className="pt-16">{children}</main>
      </div>
    );
  } catch (error) {
    console.error('Auth error:', error);
    redirect('/login');
  }
}
