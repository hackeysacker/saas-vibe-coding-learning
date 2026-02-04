'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  Layout,
  Settings,
  Hammer,
  Sparkles,
  Rocket,
  Check,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'ideation', label: 'Ideation', icon: Lightbulb, description: 'Define your app idea' },
  { id: 'planning', label: 'Planning', icon: Layout, description: 'Plan features and tech stack' },
  { id: 'setup', label: 'Setup', icon: Settings, description: 'Set up project structure' },
  { id: 'building', label: 'Building', icon: Hammer, description: 'Build your features' },
  { id: 'polish', label: 'Polish', icon: Sparkles, description: 'Refine and test' },
  { id: 'deploy', label: 'Deploy', icon: Rocket, description: 'Launch to the world' },
];

const niches = [
  { id: 'productivity', label: 'Productivity', examples: 'Todo apps, habit trackers, note-taking' },
  { id: 'ecommerce', label: 'E-commerce', examples: 'Online stores, product catalogs' },
  { id: 'social', label: 'Social', examples: 'Community platforms, chat apps' },
  { id: 'portfolio', label: 'Portfolio', examples: 'Personal sites, project showcases' },
  { id: 'dashboard', label: 'Dashboard', examples: 'Analytics, admin panels' },
  { id: 'other', label: 'Other', examples: 'Something unique!' },
];

const techStacks = [
  { id: 'react-basic', label: 'React (Beginner)', techs: ['React', 'CSS', 'LocalStorage'] },
  { id: 'nextjs-basic', label: 'Next.js (Intermediate)', techs: ['Next.js', 'Tailwind CSS', 'API Routes'] },
  { id: 'fullstack', label: 'Full Stack (Advanced)', techs: ['Next.js', 'Tailwind', 'Supabase', 'PostgreSQL'] },
];

interface ProjectWizardProps {
  onComplete: (data: {
    title: string;
    description: string;
    niche: string;
    techStack: string[];
  }) => void;
  initialStep?: string;
}

export function ProjectWizard({ onComplete, initialStep = 'ideation' }: ProjectWizardProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const canProceed = () => {
    switch (currentStep) {
      case 'ideation':
        return projectTitle.trim() && selectedNiche;
      case 'planning':
        return selectedTechStack && features.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    const tech = techStacks.find((t) => t.id === selectedTechStack);
    onComplete({
      title: projectTitle,
      description: projectDescription,
      niche: selectedNiche,
      techStack: tech?.techs || [],
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = index < currentStepIndex;
            const StepIcon = step.icon;

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                      isActive && 'bg-violet-600 text-white',
                      isCompleted && 'bg-emerald-500 text-white',
                      !isActive && !isCompleted && 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium',
                      isActive ? 'text-violet-600' : 'text-zinc-500'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 w-16 transition-colors',
                      index < currentStepIndex ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-700'
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 'ideation' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  What do you want to build?
                </h2>
                <p className="mt-2 text-zinc-500">
                  Tell us about your app idea. Don't worry about making it perfect - we'll refine it together.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Project Name
                </label>
                <Input
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g., Habit Tracker, Recipe Book, Budget App"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Describe your idea (optional)
                </label>
                <Textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="What problem does it solve? Who is it for? What makes it special?"
                  rows={4}
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  What category fits best?
                </label>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {niches.map((niche) => (
                    <Card
                      key={niche.id}
                      className={cn(
                        'cursor-pointer p-4 transition-all hover:shadow-md',
                        selectedNiche === niche.id &&
                          'ring-2 ring-violet-500 bg-violet-50 dark:bg-violet-900/20'
                      )}
                      onClick={() => setSelectedNiche(niche.id)}
                    >
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                        {niche.label}
                      </h4>
                      <p className="mt-1 text-sm text-zinc-500">{niche.examples}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'planning' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Plan your {projectTitle}
                </h2>
                <p className="mt-2 text-zinc-500">
                  Let's define the features and choose the right technology stack.
                </p>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Choose a Tech Stack
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {techStacks.map((stack) => (
                    <Card
                      key={stack.id}
                      className={cn(
                        'cursor-pointer p-4 transition-all hover:shadow-md',
                        selectedTechStack === stack.id &&
                          'ring-2 ring-violet-500 bg-violet-50 dark:bg-violet-900/20'
                      )}
                      onClick={() => setSelectedTechStack(stack.id)}
                    >
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                        {stack.label}
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {stack.techs.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Core Features (MVP)
                </label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature..."
                    onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
                  />
                  <Button onClick={handleAddFeature}>Add</Button>
                </div>
                {features.length > 0 ? (
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between rounded-lg bg-zinc-50 px-4 py-2 dark:bg-zinc-800"
                      >
                        <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                        <button
                          onClick={() => handleRemoveFeature(index)}
                          className="text-zinc-400 hover:text-red-500"
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-zinc-500 italic">
                    Add features like "User login", "Add tasks", "View dashboard"...
                  </p>
                )}
              </div>
            </div>
          )}

          {currentStep === 'setup' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Project Setup
                </h2>
                <p className="mt-2 text-zinc-500">
                  Great planning! Now let's set up your project structure.
                </p>
              </div>

              <Card className="p-6">
                <h3 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-100">
                  Your Project Summary
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-zinc-500">Project:</dt>
                    <dd className="font-medium text-zinc-900 dark:text-zinc-100">{projectTitle}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-zinc-500">Category:</dt>
                    <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                      {niches.find((n) => n.id === selectedNiche)?.label}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-zinc-500">Tech Stack:</dt>
                    <dd className="font-medium text-zinc-900 dark:text-zinc-100">
                      {techStacks.find((t) => t.id === selectedTechStack)?.label}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-2 text-zinc-500">Features ({features.length}):</dt>
                    <dd className="flex flex-wrap gap-2">
                      {features.map((f, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                        >
                          {f}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Card>

              <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                <p className="text-amber-800 dark:text-amber-200">
                  <Lightbulb className="mr-2 inline-block h-5 w-5" />
                  Click "Start Building" to begin! Your AI mentor will guide you through each step.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStepIndex === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {currentStep === 'setup' ? (
          <Button onClick={handleComplete}>
            <Rocket className="mr-2 h-4 w-4" />
            Start Building
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!canProceed()}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
