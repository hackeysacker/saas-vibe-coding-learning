'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Code,
  Rocket,
  Flame,
  Trophy,
  Clock,
  ChevronRight,
  Target,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { modules } from '@/data/modules';
import { challenges } from '@/data/challenges';
import { formatDuration } from '@/lib/utils';

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Mock stats (would come from database in production)
  const stats = {
    modulesCompleted: 2,
    totalModules: modules.length,
    challengesSolved: 3,
    totalChallenges: challenges.length,
    projectsCompleted: 0,
    currentStreak: 5,
    totalTimeSpent: 320, // minutes
  };

  const progressPercentage = Math.round(
    (stats.modulesCompleted / stats.totalModules) * 100
  );

  // Get current module and next challenges
  const currentModule = modules[stats.modulesCompleted] || modules[0];
  const recentChallenges = challenges.slice(0, 3);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {greeting}! 👋
        </h1>
        <p className="mt-2 text-zinc-500">
          Ready to continue your coding journey? Here's your progress.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard
          icon={BookOpen}
          label="Modules Completed"
          value={`${stats.modulesCompleted}/${stats.totalModules}`}
          color="violet"
        />
        <StatCard
          icon={Code}
          label="Challenges Solved"
          value={`${stats.challengesSolved}/${stats.totalChallenges}`}
          color="emerald"
        />
        <StatCard
          icon={Flame}
          label="Day Streak"
          value={`${stats.currentStreak} days`}
          color="amber"
        />
        <StatCard
          icon={Clock}
          label="Total Time"
          value={formatDuration(stats.totalTimeSpent)}
          color="blue"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Learning Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-violet-500" />
                Learning Progress
              </CardTitle>
              <Link href="/learn">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {/* Overall Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-zinc-500">Overall Progress</span>
                  <span className="font-medium text-violet-600">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>

              {/* Continue Learning */}
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="info" className="mb-2">
                      Continue Learning
                    </Badge>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {currentModule.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                      {currentModule.description}
                    </p>
                  </div>
                  <Link href={`/learn/${currentModule.slug}`}>
                    <Button>Continue</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/learn" className="block">
                <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      Continue Learning
                    </p>
                    <p className="text-sm text-zinc-500">Pick up where you left off</p>
                  </div>
                </div>
              </Link>

              <Link href="/practice" className="block">
                <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <Code className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      Practice Challenges
                    </p>
                    <p className="text-sm text-zinc-500">Test your skills</p>
                  </div>
                </div>
              </Link>

              <Link href="/create" className="block">
                <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      Build a Project
                    </p>
                    <p className="text-sm text-zinc-500">Create something real</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-emerald-500" />
              Practice Challenges
            </CardTitle>
            <Link href="/practice">
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentChallenges.map((challenge) => (
                <Link key={challenge.id} href={`/practice/${challenge.slug}`}>
                  <div className="rounded-lg border border-zinc-200 p-4 transition-all hover:border-violet-200 hover:shadow-sm dark:border-zinc-700 dark:hover:border-violet-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          challenge.difficulty === 'beginner'
                            ? 'success'
                            : challenge.difficulty === 'intermediate'
                              ? 'warning'
                              : 'danger'
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                      <Badge variant="info">{challenge.type.replace('_', ' ')}</Badge>
                    </div>
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                      {challenge.title}
                    </h4>
                    <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                      {challenge.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: 'violet' | 'emerald' | 'amber' | 'blue';
}) {
  const colors = {
    violet: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-zinc-500">{label}</p>
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
