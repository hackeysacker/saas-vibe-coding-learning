'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Clock,
  Target,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AIChat } from '@/components/shared/ai-chat';
import { cn, formatDuration } from '@/lib/utils';
import type { Module, ConversationMessage } from '@/types';

interface LessonViewProps {
  module: Module;
  messages: ConversationMessage[];
  onSendMessage: (message: string) => Promise<void>;
  onBack: () => void;
  onComplete: () => void;
  isLoading?: boolean;
  progress?: number;
}

export function LessonView({
  module,
  messages,
  onSendMessage,
  onBack,
  onComplete,
  isLoading = false,
  progress = 0,
}: LessonViewProps) {
  const [showContent, setShowContent] = useState(true);

  const welcomeMessage = `Welcome to **${module.title}**!

${module.content.introduction}

**What you'll learn:**
${module.content.learning_objectives.map((obj) => `- ${obj}`).join('\n')}

Ready to start? Let me know what you already know about this topic, and we'll tailor the lesson to your level.`;

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Left Panel - Content View */}
      <div
        className={cn(
          'flex flex-col border-r border-zinc-200 dark:border-zinc-800',
          showContent ? 'w-full lg:w-1/2' : 'hidden lg:flex lg:w-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {module.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatDuration(module.estimated_duration)}</span>
                <span>·</span>
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
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setShowContent(!showContent)}
          >
            Chat
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-zinc-500">Lesson Progress</span>
            <span className="font-medium text-violet-600">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Learning Objectives */}
          <div className="mb-8">
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
              <Target className="h-5 w-5 text-violet-500" />
              Learning Objectives
            </h3>
            <ul className="space-y-2">
              {module.content.learning_objectives.map((objective, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{objective}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Lesson Sections */}
          <div className="space-y-8">
            {module.content.sections.map((section, index) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                    {index + 1}
                  </span>
                  {section.title}
                </h4>

                <p className="mb-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {section.content}
                </p>

                {/* Code Example */}
                {section.code_example && (
                  <div className="mb-4 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                    <div className="flex items-center justify-between bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {section.code_example.language}
                      </span>
                    </div>
                    <pre className="overflow-x-auto bg-zinc-900 p-4 text-sm">
                      <code className="text-zinc-100">
                        {section.code_example.code}
                      </code>
                    </pre>
                    {section.code_example.explanation && (
                      <div className="bg-blue-50 px-4 py-3 dark:bg-blue-900/20">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <Lightbulb className="mr-2 inline-block h-4 w-4" />
                          {section.code_example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Mini Challenge */}
                {section.mini_challenge && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                    <h5 className="mb-2 font-semibold text-amber-800 dark:text-amber-200">
                      Quick Check
                    </h5>
                    <p className="text-amber-700 dark:text-amber-300">
                      {section.mini_challenge.question}
                    </p>
                    <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
                      💡 Hint: {section.mini_challenge.hint}
                    </p>
                  </div>
                )}
              </motion.section>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 rounded-lg bg-violet-50 p-6 dark:bg-violet-900/20">
            <h4 className="mb-3 font-semibold text-violet-900 dark:text-violet-100">
              Summary
            </h4>
            <p className="mb-4 text-violet-800 dark:text-violet-200">
              {module.content.summary}
            </p>

            <h5 className="mb-2 font-medium text-violet-900 dark:text-violet-100">
              Next Steps:
            </h5>
            <ul className="space-y-1">
              {module.content.next_steps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-violet-700 dark:text-violet-300"
                >
                  <ChevronRight className="h-4 w-4" />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Complete Button */}
          <div className="mt-8">
            <Button onClick={onComplete} className="w-full" size="lg">
              <CheckCircle className="mr-2 h-5 w-5" />
              Mark as Complete
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - AI Chat */}
      <div
        className={cn(
          'flex flex-col bg-zinc-50 dark:bg-zinc-900/50',
          showContent ? 'hidden lg:flex lg:w-1/2' : 'w-full'
        )}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-violet-500" />
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              AI Tutor
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setShowContent(true)}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Content
          </Button>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-hidden">
          <AIChat
            messages={messages}
            onSendMessage={onSendMessage}
            isLoading={isLoading}
            placeholder="Ask me about this lesson..."
            welcomeMessage={welcomeMessage}
          />
        </div>
      </div>
    </div>
  );
}
