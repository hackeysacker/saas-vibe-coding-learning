'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Target,
  Clock,
  Lightbulb,
  CheckCircle,
  MessageSquare,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CodeEditor } from './code-editor';
import { AIChat } from '@/components/shared/ai-chat';
import { cn, formatDuration } from '@/lib/utils';
import type { Challenge, ConversationMessage } from '@/types';

interface ChallengeViewProps {
  challenge: Challenge;
  messages: ConversationMessage[];
  onSendMessage: (message: string) => Promise<void>;
  onSubmit: (code: string) => void;
  onBack: () => void;
  isLoading?: boolean;
  testResults?: { passed: boolean; message: string }[];
}

export function ChallengeView({
  challenge,
  messages,
  onSendMessage,
  onSubmit,
  onBack,
  isLoading = false,
  testResults,
}: ChallengeViewProps) {
  const [code, setCode] = useState(challenge.starter_code);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const currentHint = challenge.hints[hintsUsed - 1];
  const hasMoreHints = hintsUsed < challenge.hints.length;

  const handleGetHint = () => {
    if (hasMoreHints) {
      setHintsUsed((prev) => prev + 1);
      setShowHint(true);
    }
  };

  const handleSubmit = () => {
    onSubmit(code);
    setShowHint(false);
  };

  const challengeTypeLabels: Record<string, string> = {
    fix_bug: 'Fix the Bug',
    build_feature: 'Build Feature',
    refactor: 'Refactor',
    debug: 'Debug',
  };

  const welcomeMessage = `I'm here to help you with the **${challenge.title}** challenge!

${challenge.description}

**Learning Goals:**
${challenge.learning_goals.map((goal) => `- ${goal}`).join('\n')}

Give it a try, and I'll review your code when you're ready. If you get stuck, just ask!`;

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* Left Panel - Challenge Info & Editor */}
      <div
        className={cn(
          'flex flex-col',
          showChat ? 'w-full lg:w-1/2' : 'w-full'
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
                {challenge.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Badge variant="info">{challengeTypeLabels[challenge.type]}</Badge>
                <span>·</span>
                <Clock className="h-3.5 w-3.5" />
                <span>{formatDuration(challenge.estimated_time)}</span>
              </div>
            </div>
          </div>

          <Button
            variant={showChat ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            {showChat ? 'Hide Chat' : 'Ask AI'}
          </Button>
        </div>

        {/* Challenge Description */}
        <div className="border-b border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="text-zinc-600 dark:text-zinc-400">{challenge.description}</p>

          {/* Learning Goals */}
          <div className="mt-4">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              <Target className="h-4 w-4 text-violet-500" />
              What you'll practice:
            </h4>
            <ul className="flex flex-wrap gap-2">
              {challenge.learning_goals.map((goal, index) => (
                <li
                  key={index}
                  className="rounded-full bg-violet-100 px-3 py-1 text-xs text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                >
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hint Display */}
        {showHint && currentHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-b border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20"
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">
                  Hint {hintsUsed} of {challenge.hints.length}
                </p>
                <p className="mt-1 text-amber-700 dark:text-amber-300">
                  {currentHint.text}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Code Editor */}
        <div className="flex-1 overflow-hidden p-4">
          <CodeEditor
            initialCode={challenge.starter_code}
            language={
              challenge.type === 'fix_bug' && challenge.starter_code.includes('<script')
                ? 'html'
                : challenge.starter_code.includes('import') && challenge.starter_code.includes('useState')
                  ? 'jsx'
                  : challenge.starter_code.includes('<')
                    ? 'html'
                    : challenge.starter_code.includes('{') && challenge.starter_code.includes(':')
                      ? 'css'
                      : 'javascript'
            }
            onCodeChange={setCode}
            onRun={handleSubmit}
            onReset={() => setCode(challenge.starter_code)}
            onGetHint={hasMoreHints ? handleGetHint : undefined}
            isRunning={isLoading}
            testResults={testResults}
            className="h-full"
          />
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between border-t border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            {hasMoreHints && (
              <Button variant="outline" size="sm" onClick={handleGetHint}>
                <Lightbulb className="h-4 w-4 mr-1" />
                Get Hint ({challenge.hints.length - hintsUsed} left)
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSolution(!showSolution)}
            >
              {showSolution ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  Hide Solution
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  Peek Solution
                </>
              )}
            </Button>
          </div>
          <Button onClick={handleSubmit} isLoading={isLoading}>
            <CheckCircle className="h-4 w-4 mr-1" />
            Submit
          </Button>
        </div>

        {/* Solution Reveal */}
        {showSolution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-zinc-200 bg-zinc-900 p-4 dark:border-zinc-700"
          >
            <h4 className="mb-2 text-sm font-medium text-zinc-400">
              Reference Solution
            </h4>
            <pre className="overflow-x-auto text-sm text-zinc-300">
              <code>{challenge.solution_code}</code>
            </pre>
            <p className="mt-3 text-xs text-zinc-500">
              Try to solve it yourself first - looking at solutions before trying reduces learning!
            </p>
          </motion.div>
        )}
      </div>

      {/* Right Panel - AI Chat */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '50%' }}
          exit={{ opacity: 0, width: 0 }}
          className="hidden border-l border-zinc-200 dark:border-zinc-800 lg:flex lg:flex-col"
        >
          <AIChat
            messages={messages}
            onSendMessage={onSendMessage}
            isLoading={isLoading}
            placeholder="Ask for help or submit code for review..."
            welcomeMessage={welcomeMessage}
            className="h-full"
          />
        </motion.div>
      )}
    </div>
  );
}
