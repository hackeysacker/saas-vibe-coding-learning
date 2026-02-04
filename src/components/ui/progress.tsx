'use client';

import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
}

export function Progress({
  value,
  max = 100,
  className,
  indicatorClassName,
  showLabel = false,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className={cn(
            'h-full rounded-full bg-violet-600 transition-all duration-500 ease-out',
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="min-w-[3rem] text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
