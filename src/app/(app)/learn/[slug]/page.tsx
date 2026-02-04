'use client';

import { useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { LessonView } from '@/components/learn/lesson-view';
import { getModuleBySlug } from '@/data/modules';
import type { ConversationMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const module = getModuleBySlug(slug);

  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(25);

  if (!module) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Module not found
          </h1>
          <p className="mt-2 text-zinc-500">
            The module you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleSendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: ConversationMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // In production, this would call the AI API
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const assistantMessage: ConversationMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: getSimulatedResponse(content, module.title),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Update progress
      setProgress((prev) => Math.min(prev + 10, 100));
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [module.title]);

  const handleBack = () => {
    router.push('/learn');
  };

  const handleComplete = () => {
    // In production, this would update the database
    router.push('/learn');
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      <LessonView
        module={module}
        messages={messages}
        onSendMessage={handleSendMessage}
        onBack={handleBack}
        onComplete={handleComplete}
        isLoading={isLoading}
        progress={progress}
      />
    </div>
  );
}

// Simulated AI responses for demo purposes
function getSimulatedResponse(userMessage: string, moduleTitle: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Hey there! Great to see you diving into ${moduleTitle}. What would you like to explore first? I'm here to help you understand everything at your own pace.`;
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
    return `No worries at all - getting stuck is part of learning! Let's break this down together. What specific part is confusing you? Sometimes explaining what you understand so far helps me figure out where the gap is.`;
  }

  if (lowerMessage.includes('example')) {
    return `Great idea to see an example! Let me show you something practical:

\`\`\`javascript
// Here's a simple example
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

This shows the basic concept in action. Would you like me to walk through each line, or would you rather try modifying it yourself first?`;
  }

  if (lowerMessage.includes('next') || lowerMessage.includes('continue')) {
    return `Perfect, you're making great progress! Let's move on to the next concept. Remember, everything builds on what you've learned so far, so don't hesitate to ask if something doesn't click.

Ready to dive deeper?`;
  }

  if (lowerMessage.includes('practice') || lowerMessage.includes('exercise')) {
    return `Love the enthusiasm! Practice is the best way to solidify what you're learning. I'd suggest heading over to the Practice tab where you'll find challenges specifically designed for this module.

Want me to explain anything else before you jump in?`;
  }

  // Default response
  return `That's a great question about ${moduleTitle}!

The key thing to understand here is that this concept builds on the fundamentals we've covered. Think of it like building blocks - each piece connects to the others.

Let me know if you want me to:
- Explain this concept in a different way
- Show you a practical example
- Move on to the next topic

What works best for you?`;
}
