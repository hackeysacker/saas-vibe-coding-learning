import { Navigation } from '@/components/shared/navigation';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
