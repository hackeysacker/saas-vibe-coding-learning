'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Code, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChallengeList } from '@/components/practice/challenge-list';
import { challenges } from '@/data/challenges';
import type { Challenge, ChallengeAttempt } from '@/types';

export default function PracticePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Mock attempts data (would come from database)
  const attemptsMap = new Map<string, ChallengeAttempt[]>([
    [
      'chal-001',
      [
        {
          id: 'att-001',
          user_id: 'user-1',
          challenge_id: 'chal-001',
          code: 'fixed code',
          status: 'passed',
          hints_used: 1,
          submitted_at: '2024-01-05',
        },
      ],
    ],
    [
      'chal-003',
      [
        {
          id: 'att-002',
          user_id: 'user-1',
          challenge_id: 'chal-003',
          code: 'attempted code',
          status: 'failed',
          hints_used: 0,
          submitted_at: '2024-01-06',
        },
        {
          id: 'att-003',
          user_id: 'user-1',
          challenge_id: 'chal-003',
          code: 'fixed code',
          status: 'passed',
          hints_used: 2,
          submitted_at: '2024-01-06',
        },
      ],
    ],
  ]);

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      !selectedDifficulty || challenge.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleChallengeSelect = (challenge: Challenge) => {
    router.push(`/practice/${challenge.slug}`);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <Code className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Practice Challenges
          </h1>
        </div>
        <p className="text-zinc-500">
          Hands-on coding challenges to build your skills. Fix bugs, build features, and get
          AI-powered feedback.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-400" />
          <div className="flex gap-1">
            {['beginner', 'intermediate', 'advanced'].map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? 'primary' : 'ghost'}
                size="sm"
                onClick={() =>
                  setSelectedDifficulty(
                    selectedDifficulty === difficulty ? null : difficulty
                  )
                }
                className="capitalize"
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Challenge List */}
      <ChallengeList
        challenges={filteredChallenges}
        attempts={attemptsMap}
        onChallengeSelect={handleChallengeSelect}
      />
    </div>
  );
}
