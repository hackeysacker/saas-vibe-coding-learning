'use client';

import { useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChallengeView } from '@/components/practice/challenge-view';
import { getChallengeBySlug } from '@/data/challenges';
import type { ConversationMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function ChallengePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const challenge = getChallengeBySlug(slug);

  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<
    { passed: boolean; message: string }[] | undefined
  >();

  if (!challenge) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Challenge not found
          </h1>
          <p className="mt-2 text-zinc-500">
            The challenge you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: ConversationMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate AI response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const assistantMessage: ConversationMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: getSimulatedPracticeResponse(content, challenge.title),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [challenge.title]);

  const handleSubmit = useCallback(
    async (code: string) => {
      setIsLoading(true);
      setTestResults(undefined);

      try {
        // Simulate code execution and testing
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock test results based on code content
        const results = challenge.test_cases
          .filter((tc) => !tc.is_hidden)
          .map((tc) => {
            // Simple simulation - in production, would actually run tests
            const passed = Math.random() > 0.3;
            return {
              passed,
              message: tc.description,
            };
          });

        setTestResults(results);

        // Add feedback message
        const allPassed = results.every((r) => r.passed);
        const feedbackMessage: ConversationMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: allPassed
            ? `Excellent work! All tests are passing. Your solution demonstrates a solid understanding of the concepts. Here's what you did well:\n\n- Clean code structure\n- Proper syntax usage\n- Logical approach to the problem\n\nReady to try another challenge, or would you like to refactor this solution further?`
            : `Good attempt! Some tests aren't passing yet. Let's work through this together.\n\n**What's working:**\n- Your overall approach is on the right track\n\n**What needs attention:**\n- Check the failing tests above for hints\n- Review the expected behavior in the description\n\nWould you like a hint, or want to discuss your approach?`,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, feedbackMessage]);
      } catch (error) {
        console.error('Error submitting code:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [challenge.test_cases]
  );

  const handleBack = () => {
    router.push('/practice');
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ChallengeView
        challenge={challenge}
        messages={messages}
        onSendMessage={handleSendMessage}
        onSubmit={handleSubmit}
        onBack={handleBack}
        isLoading={isLoading}
        testResults={testResults}
      />
    </div>
  );
}

function getSimulatedPracticeResponse(
  userMessage: string,
  challengeTitle: string
): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('hint') || lowerMessage.includes('help')) {
    return `Let me give you a nudge in the right direction for "${challengeTitle}":\n\n1. First, identify the core issue - what's not working as expected?\n2. Think about what the correct behavior should be\n3. Check for common mistakes like typos or missing syntax\n\nWant me to be more specific about any part?`;
  }

  if (lowerMessage.includes('stuck')) {
    return `I can see you're working hard on this! Let's break it down:\n\n**First, let's verify your understanding:**\n- What should the code do when it works correctly?\n- What is it doing instead?\n\nOnce we identify the gap, the fix usually becomes clearer. What have you tried so far?`;
  }

  if (lowerMessage.includes('explain') || lowerMessage.includes('why')) {
    return `Great question! Understanding the "why" is crucial for real learning.\n\nThe concept here relates to how JavaScript handles certain operations. When you write code, the interpreter reads it in a specific order and follows certain rules.\n\nIn this case, the key insight is that small details matter - a missing character or wrong case can completely change the behavior.\n\nDoes that help clarify things?`;
  }

  if (lowerMessage.includes('review') || lowerMessage.includes('check')) {
    return `I'd be happy to review your code! Please share what you have, and I'll give you specific feedback on:\n\n1. Whether it solves the problem\n2. Code style and best practices\n3. Any potential improvements\n\nJust paste your code or click Submit to run the tests.`;
  }

  // Default response
  return `I'm here to help you with "${challengeTitle}"!\n\nA few things I can do:\n- Review your code and give feedback\n- Provide hints if you're stuck\n- Explain concepts in different ways\n- Walk through the solution step by step (after you've tried!)\n\nWhat would be most helpful right now?`;
}
