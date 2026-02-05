import { type NextRequest, NextResponse } from 'next/server';

// Demo mode - no auth required
const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function middleware(request: NextRequest) {
  // In demo mode, just pass through - no auth checks
  if (DEMO_MODE) {
    return NextResponse.next();
  }

  // Only import Supabase middleware if we're not in demo mode
  try {
    const { updateSession } = await import('@/lib/supabase/middleware');
    return await updateSession(request);
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
