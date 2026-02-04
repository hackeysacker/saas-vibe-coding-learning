'use client';

import { motion } from 'framer-motion';
import {
  Bug,
  Hammer,
  RefreshCw,
  Search,
  Clock,
  Check,
  ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, formatDuration } from '@/lib/utils';
import type { Challenge, ChallengeAttempt } from '@/types';

const typeIcons = {
  fix_bug: Bug,
  build_feature: Hammer,
  refactor: RefreshCw,
  debug: Search,
};

const typeLabels = {
  fix_bug: 'Fix Bug',
  build_feature: 'Build',
  refactor: 'Refactor',
  debug: 'Debug',
};

interface ChallengeListProps {
  challenges: Challenge[];
  attempts: Map<string, ChallengeAttempt[]>;
  onChallengeSelect: (challenge: Challenge) => void;
  currentChallengeId?: string;
}

export function ChallengeList({
  challenges,
  attempts,
  onChallengeSelect,
  currentChallengeId,
}: ChallengeListProps) {
  // Group challenges by type
  const groupedChallenges = challenges.reduce(
    (acc, challenge) => {
      const type = challenge.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(challenge);
      return acc;
    },
    {} as Record<string, Challenge[]>
  );

  const typeOrder = ['fix_bug', 'build_feature', 'refactor', 'debug'];
  const sortedTypes = typeOrder.filter((type) => groupedChallenges[type]);

  if (challenges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <Hammer className="h-8 w-8 text-zinc-400" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          No challenges yet
        </h3>
        <p className="mt-1 text-zinc-500">
          Complete some learning modules to unlock practice challenges.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedTypes.map((type) => {
        const TypeIcon = typeIcons[type as keyof typeof typeIcons];

        return (
          <div key={type}>
            <div className="mb-4 flex items-center gap-2">
              <TypeIcon className="h-5 w-5 text-zinc-500" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {typeLabels[type as keyof typeof typeLabels]} Challenges
              </h3>
              <span className="text-sm text-zinc-500">
                ({groupedChallenges[type].length})
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groupedChallenges[type].map((challenge, index) => {
                const challengeAttempts = attempts.get(challenge.id) || [];
                const hasPassed = challengeAttempts.some((a) => a.status === 'passed');
                const attemptCount = challengeAttempts.length;
                const isCurrent = challenge.id === currentChallengeId;

                return (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    hasPassed={hasPassed}
                    attemptCount={attemptCount}
                    isCurrent={isCurrent}
                    onClick={() => onChallengeSelect(challenge)}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface ChallengeCardProps {
  challenge: Challenge;
  hasPassed: boolean;
  attemptCount: number;
  isCurrent: boolean;
  onClick: () => void;
  index: number;
}

function ChallengeCard({
  challenge,
  hasPassed,
  attemptCount,
  isCurrent,
  onClick,
  index,
}: ChallengeCardProps) {
  const TypeIcon = typeIcons[challenge.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className={cn(
          'group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md',
          isCurrent && 'ring-2 ring-violet-500',
          hasPassed && 'bg-emerald-50/50 dark:bg-emerald-900/10'
        )}
        onClick={onClick}
      >
        <div className="p-5">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                  hasPassed
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'
                )}
              >
                <TypeIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                  {challenge.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
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
                </div>
              </div>
            </div>
            {hasPassed && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          {/* Description */}
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {challenge.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(challenge.estimated_time)}</span>
              </div>
              {attemptCount > 0 && (
                <span className="text-zinc-400">
                  {attemptCount} attempt{attemptCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <ChevronRight className="h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
