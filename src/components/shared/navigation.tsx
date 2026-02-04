'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Code,
  Rocket,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';

interface NavigationProps {
  user?: {
    name: string;
    email: string;
    avatar_url?: string | null;
  } | null;
  onSignOut?: () => void;
}

const mainNavItems = [
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/practice', label: 'Practice', icon: Code },
  { href: '/create', label: 'Create', icon: Rocket },
];

const secondaryNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Navigation({ user, onSignOut }: NavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 h-16 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600">
            <Code className="h-5 w-5 text-white" />
          </div>
          <span className="hidden font-semibold text-zinc-900 dark:text-zinc-100 sm:block">
            Vibe Coding Academy
          </span>
        </Link>

        {/* Main Nav - Desktop */}
        {user && (
          <div className="hidden items-center gap-1 md:flex">
            {mainNavItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-lg bg-violet-100 dark:bg-violet-900/30"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Secondary Nav - Desktop */}
              <div className="hidden items-center gap-1 md:flex">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                      pathname === item.href && 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                    )}
                    title={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>

              {/* User Menu - Desktop */}
              <div className="hidden items-center gap-3 border-l border-zinc-200 pl-3 dark:border-zinc-700 md:flex">
                <Avatar name={user.name} src={user.avatar_url} size="sm" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSignOut}
                  className="text-zinc-500"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {user && isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 top-16 w-full border-b border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {[...mainNavItems, ...secondaryNavItems].map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'
                      : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <hr className="my-2 border-zinc-200 dark:border-zinc-700" />
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                <Avatar name={user.name} src={user.avatar_url} size="sm" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {user.name}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
