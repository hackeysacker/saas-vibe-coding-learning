import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vibe Coding Academy - Learn to Code by Building',
  description:
    'Learn to code by building real projects with AI guidance. Interactive lessons, hands-on challenges, and guided project building.',
  keywords: ['coding', 'learn to code', 'programming', 'web development', 'AI tutor', 'coding bootcamp'],
  openGraph: {
    title: 'Vibe Coding Academy - Learn to Code by Building',
    description:
      'Stop watching tutorials. Start building real apps with an AI mentor by your side.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
