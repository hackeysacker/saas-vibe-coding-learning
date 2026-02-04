'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ModuleList } from '@/components/learn/module-list';
import { modules } from '@/data/modules';
import type { Module, UserProgress } from '@/types';

export default function LearnPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock progress data (would come from database)
  const progressMap = new Map<string, UserProgress>([
    [
      'mod-001',
      {
        id: 'prog-001',
        user_id: 'user-1',
        module_id: 'mod-001',
        status: 'completed',
        completion_percentage: 100,
        started_at: '2024-01-01',
        completed_at: '2024-01-02',
        time_spent: 35,
      },
    ],
    [
      'mod-002',
      {
        id: 'prog-002',
        user_id: 'user-1',
        module_id: 'mod-002',
        status: 'completed',
        completion_percentage: 100,
        started_at: '2024-01-03',
        completed_at: '2024-01-04',
        time_spent: 50,
      },
    ],
    [
      'mod-003',
      {
        id: 'prog-003',
        user_id: 'user-1',
        module_id: 'mod-003',
        status: 'in_progress',
        completion_percentage: 45,
        started_at: '2024-01-05',
        time_spent: 25,
      },
    ],
  ]);

  const filteredModules = modules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModuleSelect = (module: Module) => {
    router.push(`/learn/${module.slug}`);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Learning Modules
          </h1>
        </div>
        <p className="text-zinc-500">
          Interactive lessons to build your coding foundation. Start from the beginning or jump to
          what you need.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          type="text"
          placeholder="Search modules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Module List */}
      <ModuleList
        modules={filteredModules}
        progress={progressMap}
        onModuleSelect={handleModuleSelect}
        currentModuleId="mod-003"
      />
    </div>
  );
}
