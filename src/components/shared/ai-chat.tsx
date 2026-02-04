'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ConversationMessage, SuggestedAction } from '@/types';

interface AIChatProps {
  messages: ConversationMessage[];
  onSendMessage: (message: string) => Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
  suggestedActions?: SuggestedAction[];
  onActionClick?: (action: SuggestedAction) => void;
  className?: string;
  welcomeMessage?: string;
}

export function AIChat({
  messages,
  onSendMessage,
  isLoading = false,
  placeholder = "Ask me anything...",
  suggestedActions = [],
  onActionClick,
  className,
  welcomeMessage,
}: AIChatProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await onSendMessage(message);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Welcome Message */}
        {messages.length === 0 && welcomeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-6 dark:from-violet-500/20 dark:to-purple-500/20"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Vibe Coding Academy
                </p>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                  {welcomeMessage}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Message List */}
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <MessageBubble key={message.id || index} message={message} />
            ))}
          </AnimatePresence>

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                <Bot className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl rounded-tl-none bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
                <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                <span className="text-sm text-zinc-500">Thinking...</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Suggested Actions */}
        {suggestedActions.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {suggestedActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onActionClick?.(action)}
              >
                {action.label}
              </Button>
            ))}
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[44px] max-h-[200px] resize-none"
            rows={1}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="lg"
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-2 text-xs text-zinc-400">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

// Message Bubble Component
function MessageBubble({ message }: { message: ConversationMessage }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn('flex items-start gap-3', isUser && 'flex-row-reverse')}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-zinc-200 dark:bg-zinc-700'
            : 'bg-violet-100 dark:bg-violet-900/30'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        ) : (
          <Bot className="h-4 w-4 text-violet-600 dark:text-violet-400" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3',
          isUser
            ? 'rounded-tr-none bg-violet-600 text-white'
            : 'rounded-tl-none bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
        )}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <MessageContent content={message.content} />
        </div>
      </div>
    </motion.div>
  );
}

// Parse and render message content (handles markdown-like formatting)
function MessageContent({ content }: { content: string }) {
  // Simple markdown-like parsing for code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const codeContent = part.slice(3, -3);
          const [language, ...codeLines] = codeContent.split('\n');
          const code = codeLines.join('\n').trim();

          return (
            <pre
              key={index}
              className="my-2 overflow-x-auto rounded-lg bg-zinc-900 p-3 text-sm dark:bg-zinc-950"
            >
              <code className="text-zinc-100">{code || language}</code>
            </pre>
          );
        }

        // Parse inline code
        const inlineParts = part.split(/(`[^`]+`)/g);
        return (
          <span key={index}>
            {inlineParts.map((inlinePart, i) => {
              if (inlinePart.startsWith('`') && inlinePart.endsWith('`')) {
                return (
                  <code
                    key={i}
                    className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-700"
                  >
                    {inlinePart.slice(1, -1)}
                  </code>
                );
              }
              return inlinePart;
            })}
          </span>
        );
      })}
    </>
  );
}
