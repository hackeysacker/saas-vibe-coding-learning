'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Check,
  Lock,
  Clock,
  ChevronRight,
  Globe,
  FileCode,
  Palette,
  Code,
  Database,
  Cloud,
  Wrench,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn, formatDuration } from '@/lib/utils';
import type { Module, UserProgress } from '@/types';

// Icon mapping for module categories
const categoryIcons: Record<string, React.ElementType> = {
  fundamentals: Globe,
  frontend: FileCode,
  backend: Database,
  database: Database,
  deployment: Cloud,
  tools: Wrench,
};

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  'file-code': FileCode,
  palette: Palette,
  code: Code,
  component: Code,
  database: Database,
  cloud: Cloud,
  book: BookOpen,
};

interface ModuleListProps {
  modules: Module[];
  progress: Map<string, UserProgress>;
  onModuleSelect: (module: Module) => void;
  currentModuleId?: string;
}

export function ModuleList({
  modules,
  progress,
  onModuleSelect,
  currentModuleId,
}: ModuleListProps) {
  // Group modules by category
  const categories = modules.reduce(
    (acc, module) => {
      const category = module.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(module);
      return acc;
    },
    {} as Record<string, Module[]>
  );

  const categoryOrder = ['fundamentals', 'frontend', 'backend', 'database', 'deployment', 'tools'];
  const sortedCategories = categoryOrder.filter((cat) => categories[cat]);

  const categoryLabels: Record<string, string> = {
    fundamentals: 'Fundamentals',
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    database: 'Databases',
    deployment: 'Deployment & DevOps',
    tools: 'Developer Tools',
  };

  return (
    <div className="space-y-8">
      {sortedCategories.map((category) => {
        const CategoryIcon = categoryIcons[category] || BookOpen;

        return (
          <div key={category}>
            <div className="mb-4 flex items-center gap-2">
              <CategoryIcon className="h-5 w-5 text-zinc-500" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {categoryLabels[category]}
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories[category].map((module, index) => {
                const moduleProgress = progress.get(module.id);
                const isCompleted = moduleProgress?.status === 'completed';
                const isInProgress = moduleProgress?.status === 'in_progress';
                const isCurrent = module.id === currentModuleId;
                const isLocked = !module.is_free && !isInProgress && !isCompleted;

                return (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    progress={moduleProgress}
                    isCompleted={isCompleted}
                    isInProgress={isInProgress}
                    isCurrent={isCurrent}
                    isLocked={isLocked}
                    onClick={() => onModuleSelect(module)}
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

interface ModuleCardProps {
  module: Module;
  progress?: UserProgress;
  isCompleted: boolean;
  isInProgress: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  onClick: () => void;
  index: number;
}

function ModuleCard({
  module,
  progress,
  isCompleted,
  isInProgress,
  isCurrent,
  isLocked,
  onClick,
  index,
}: ModuleCardProps) {
  const ModuleIcon = iconMap[module.icon] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className={cn(
          'group relative cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md',
          isCurrent && 'ring-2 ring-violet-500',
          isLocked && 'opacity-60'
        )}
        onClick={onClick}
      >
        {/* Status Indicator */}
        <div className="absolute right-3 top-3">
          {isCompleted ? (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
              <Check className="h-4 w-4 text-white" />
            </div>
          ) : isLocked ? (
            <Lock className="h-5 w-5 text-zinc-400" />
          ) : null}
        </div>

        <div className="p-5">
          {/* Icon and Title */}
          <div className="mb-3 flex items-start gap-3">
            <div
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                isCompleted
                  ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                  : 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'
              )}
            >
              <ModuleIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                {module.title}
              </h4>
              <div className="mt-1 flex items-center gap-2">
                <Badge
                  variant={
                    module.difficulty === 'beginner'
                      ? 'success'
                      : module.difficulty === 'intermediate'
                        ? 'warning'
                        : 'danger'
                  }
                >
                  {module.difficulty}
                </Badge>
                {module.is_free && <Badge variant="info">Free</Badge>}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {module.description}
          </p>

          {/* Progress or Duration */}
          {isInProgress && progress ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">Progress</span>
                <span className="font-medium text-violet-600">
                  {progress.completion_percentage}%
                </span>
              </div>
              <Progress value={progress.completion_percentage} />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(module.estimated_duration)}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-1" />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
