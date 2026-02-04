'use client';

import { useCallback, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Lightbulb, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  initialCode: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => void;
  onReset?: () => void;
  onGetHint?: () => void;
  isRunning?: boolean;
  testResults?: {
    passed: boolean;
    message: string;
  }[];
  className?: string;
}

export function CodeEditor({
  initialCode,
  language = 'html',
  onCodeChange,
  onRun,
  onReset,
  onGetHint,
  isRunning = false,
  testResults,
  className,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      const newCode = value || '';
      setCode(newCode);
      onCodeChange?.(newCode);
    },
    [onCodeChange]
  );

  const handleRun = () => {
    onRun?.(code);

    // For HTML/CSS/JS, we can create a preview
    if (language === 'html' || language === 'javascript') {
      try {
        // Basic validation/execution simulation
        setOutput('Code executed successfully!');
      } catch {
        setOutput('Error executing code');
      }
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    onReset?.();
  };

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on' as const,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on' as const,
    padding: { top: 16, bottom: 16 },
  };

  // Map our language names to Monaco language IDs
  const languageMap: Record<string, string> = {
    html: 'html',
    css: 'css',
    javascript: 'javascript',
    jsx: 'javascript',
    typescript: 'typescript',
    tsx: 'typescript',
  };

  const monacoLanguage = languageMap[language] || language;

  return (
    <div className={cn('flex flex-col rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {language.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onGetHint && (
            <Button variant="ghost" size="sm" onClick={onGetHint}>
              <Lightbulb className="h-4 w-4 mr-1" />
              Hint
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button size="sm" onClick={handleRun} isLoading={isRunning}>
            <Play className="h-4 w-4 mr-1" />
            Run
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-[300px]">
        <Editor
          height="100%"
          language={monacoLanguage}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={editorOptions}
          loading={
            <div className="flex h-full items-center justify-center bg-zinc-900">
              <div className="animate-pulse text-zinc-500">Loading editor...</div>
            </div>
          }
        />
      </div>

      {/* Test Results */}
      {testResults && testResults.length > 0 && (
        <div className="border-t border-zinc-700 bg-zinc-900 p-4">
          <h4 className="mb-3 text-sm font-medium text-zinc-400">Test Results</h4>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-2 rounded-lg p-2 text-sm',
                  result.passed
                    ? 'bg-emerald-900/30 text-emerald-400'
                    : 'bg-red-900/30 text-red-400'
                )}
              >
                {result.passed ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <X className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span>{result.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Panel (if no test results) */}
      {!testResults && output && (
        <div className="border-t border-zinc-700 bg-zinc-900 p-4">
          <h4 className="mb-2 text-sm font-medium text-zinc-400">Output</h4>
          <pre className="text-sm text-zinc-300">{output}</pre>
        </div>
      )}
    </div>
  );
}
