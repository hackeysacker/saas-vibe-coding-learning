'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Rocket, FolderOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectWizard } from '@/components/create/project-wizard';
import { cn } from '@/lib/utils';

// Mock projects data
type ProjectStatus = 'ideation' | 'planning' | 'building' | 'polishing' | 'deploying' | 'completed';
type MilestoneStatus = 'pending' | 'in_progress' | 'completed';

interface MockProject {
  id: string;
  title: string;
  description: string;
  niche: string;
  tech_stack: string[];
  status: ProjectStatus;
  milestones: { id: string; title: string; status: MilestoneStatus }[];
  started_at: string;
}

const mockProjects: MockProject[] = [
  {
    id: 'proj-001',
    title: 'Habit Tracker',
    description: 'A simple app to track daily habits and build streaks',
    niche: 'productivity',
    tech_stack: ['React', 'CSS', 'LocalStorage'],
    status: 'building',
    milestones: [
      { id: 'm1', title: 'Project Setup', status: 'completed' },
      { id: 'm2', title: 'Build UI Components', status: 'completed' },
      { id: 'm3', title: 'Add State Management', status: 'in_progress' },
      { id: 'm4', title: 'Implement Storage', status: 'pending' },
      { id: 'm5', title: 'Deploy', status: 'pending' },
    ],
    started_at: '2024-01-10',
  },
];

export default function CreatePage() {
  const router = useRouter();
  const [showWizard, setShowWizard] = useState(false);
  const [projects] = useState(mockProjects);

  const handleCreateProject = (data: {
    title: string;
    description: string;
    niche: string;
    techStack: string[];
  }) => {
    // In production, this would create the project in the database
    console.log('Creating project:', data);
    router.push('/create/project-new');
  };

  if (showWizard) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-white dark:bg-zinc-900">
        <ProjectWizard onComplete={handleCreateProject} />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <Rocket className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Build Projects
            </h1>
          </div>
          <p className="text-zinc-500">
            Build real applications with AI guidance. From idea to deployment, we'll build it
            together.
          </p>
        </div>

        <Button onClick={() => setShowWizard(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const completedMilestones = project.milestones.filter(
              (m) => m.status === 'completed'
            ).length;
            const totalMilestones = project.milestones.length;
            const progressPercent = Math.round(
              (completedMilestones / totalMilestones) * 100
            );

            return (
              <Card
                key={project.id}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => router.push(`/create/${project.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge
                        variant={
                          project.status === 'completed'
                            ? 'success'
                            : project.status === 'building'
                              ? 'warning'
                              : 'default'
                        }
                        className="mb-2"
                      >
                        {project.status}
                      </Badge>
                      <CardTitle>{project.title}</CardTitle>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                      <FolderOpen className="h-6 w-6" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-zinc-500">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="mb-4 flex flex-wrap gap-1">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-zinc-500">Progress</span>
                      <span className="font-medium text-amber-600">
                        {progressPercent}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-2 rounded-full bg-amber-500 transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones Preview */}
                  <div className="flex items-center gap-1 mt-3">
                    {project.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={cn(
                          'h-2 flex-1 rounded-full',
                          milestone.status === 'completed'
                            ? 'bg-emerald-500'
                            : milestone.status === 'in_progress'
                              ? 'bg-amber-500'
                              : 'bg-zinc-200 dark:bg-zinc-700'
                        )}
                        title={milestone.title}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="py-12">
          <CardContent className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <Rocket className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Start your first project
            </h3>
            <p className="mt-2 text-zinc-500">
              Ready to build something real? Click the button below to start your first
              AI-guided project.
            </p>
            <Button className="mt-6" onClick={() => setShowWizard(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Project
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
            <span className="text-xl font-bold">1</span>
          </div>
          <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
            Define Your Idea
          </h3>
          <p className="text-sm text-zinc-500">
            Tell us what you want to build. We'll help you refine it into a achievable MVP.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
            <span className="text-xl font-bold">2</span>
          </div>
          <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
            Build Step by Step
          </h3>
          <p className="text-sm text-zinc-500">
            Follow guided milestones with AI code review and feedback at every checkpoint.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
            <span className="text-xl font-bold">3</span>
          </div>
          <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
            Deploy & Showcase
          </h3>
          <p className="text-sm text-zinc-500">
            Launch your project to the web and add it to your portfolio. Real apps, real experience.
          </p>
        </div>
      </div>
    </div>
  );
}
