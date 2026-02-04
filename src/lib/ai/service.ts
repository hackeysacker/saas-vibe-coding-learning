import Anthropic from '@anthropic-ai/sdk';
import type {
  AIRequest,
  AIResponse,
  ConversationMessage,
  Module,
  Challenge,
  Project,
  UserContext,
  CodeReview,
  CodeIssue,
} from '@/types';
import {
  getLearnPrompt,
  getPracticePrompt,
  getCreatePrompt,
  getCodeReviewPrompt,
} from './prompts';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Model selection based on task complexity
const MODELS = {
  default: 'claude-sonnet-4-20250514',
  complex: 'claude-sonnet-4-20250514',
  simple: 'claude-sonnet-4-20250514', // Could use Haiku for cost optimization
};

// Convert our conversation format to Anthropic format
function formatMessagesForAPI(
  messages: ConversationMessage[]
): Anthropic.MessageParam[] {
  return messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));
}

// Main AI interaction function
export async function getAIResponse(request: AIRequest): Promise<AIResponse> {
  const { context_type, user_message, conversation_history, user_context, additional_context } =
    request;

  let systemPrompt: string;

  // Build system prompt based on context
  switch (context_type) {
    case 'learn':
      const module = additional_context?.module as Module;
      systemPrompt = getLearnPrompt(user_context, module);
      break;

    case 'practice':
      const challenge = additional_context?.challenge as Challenge;
      systemPrompt = getPracticePrompt(user_context, challenge);
      break;

    case 'create':
      const project = additional_context?.project as Project | null;
      const wizardStep = (additional_context?.wizardStep as string) || 'ideation';
      systemPrompt = getCreatePrompt(user_context, project, wizardStep);
      break;

    default:
      throw new Error(`Unknown context type: ${context_type}`);
  }

  try {
    const response = await anthropic.messages.create({
      model: MODELS.default,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        ...formatMessagesForAPI(conversation_history),
        { role: 'user', content: user_message },
      ],
    });

    // Extract text content from response
    const textContent = response.content.find((c) => c.type === 'text');
    const message = textContent?.type === 'text' ? textContent.text : '';

    return {
      message,
      suggested_actions: extractSuggestedActions(message, context_type),
    };
  } catch (error) {
    console.error('AI API Error:', error);
    throw new Error('Failed to get AI response. Please try again.');
  }
}

// Code review specific function
export async function reviewCode(
  code: string,
  challenge: Challenge,
  userContext: UserContext,
  attemptNumber: number
): Promise<AIResponse> {
  const systemPrompt = getPracticePrompt(userContext, challenge);
  const reviewPrompt = getCodeReviewPrompt(code, challenge, attemptNumber);

  try {
    const response = await anthropic.messages.create({
      model: MODELS.complex, // Use more capable model for code review
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: reviewPrompt }],
    });

    const textContent = response.content.find((c) => c.type === 'text');
    const message = textContent?.type === 'text' ? textContent.text : '';

    // Parse code review from response
    const codeReview = parseCodeReview(message);

    return {
      message,
      metadata: { code_review: codeReview },
      suggested_actions: extractSuggestedActions(message, 'practice'),
    };
  } catch (error) {
    console.error('Code Review Error:', error);
    throw new Error('Failed to review code. Please try again.');
  }
}

// Extract suggested actions from AI response
function extractSuggestedActions(
  message: string,
  contextType: string
): AIResponse['suggested_actions'] {
  const actions: AIResponse['suggested_actions'] = [];

  // Simple heuristics to suggest actions
  const lowerMessage = message.toLowerCase();

  if (contextType === 'learn') {
    if (lowerMessage.includes('try it yourself') || lowerMessage.includes('practice')) {
      actions.push({
        type: 'go_to_practice',
        label: 'Go to Practice',
      });
    }
    if (lowerMessage.includes('next') || lowerMessage.includes('move on')) {
      actions.push({
        type: 'go_to_module',
        label: 'Next Module',
      });
    }
  }

  if (contextType === 'practice') {
    if (lowerMessage.includes('hint')) {
      actions.push({
        type: 'show_hint',
        label: 'Get a Hint',
      });
    }
    if (lowerMessage.includes('run') || lowerMessage.includes('test')) {
      actions.push({
        type: 'run_code',
        label: 'Run Code',
      });
    }
  }

  if (contextType === 'create') {
    if (lowerMessage.includes('next milestone') || lowerMessage.includes('move on')) {
      actions.push({
        type: 'next_milestone',
        label: 'Next Milestone',
      });
    }
  }

  return actions;
}

// Parse code review from AI message
function parseCodeReview(message: string): CodeReview {
  // Simple parsing - in production, you might want structured output
  const issues: CodeIssue[] = [];
  const suggestions: string[] = [];
  const praise: string[] = [];

  // Extract praise (lines starting with positive indicators)
  const praiseMatches = message.match(/(?:^|\n)(?:\*\*)?(?:Great|Good|Nice|Well done|Excellent)[^.!?]*[.!?]/gi);
  if (praiseMatches) {
    praise.push(...praiseMatches.map((m) => m.trim()));
  }

  return {
    overall_feedback: message.slice(0, 200),
    issues,
    suggestions,
    praise,
  };
}

// Streaming response for real-time chat feel
export async function* streamAIResponse(
  request: AIRequest
): AsyncGenerator<string, void, unknown> {
  const { context_type, user_message, conversation_history, user_context, additional_context } =
    request;

  let systemPrompt: string;

  switch (context_type) {
    case 'learn':
      const module = additional_context?.module as Module;
      systemPrompt = getLearnPrompt(user_context, module);
      break;

    case 'practice':
      const challenge = additional_context?.challenge as Challenge;
      systemPrompt = getPracticePrompt(user_context, challenge);
      break;

    case 'create':
      const project = additional_context?.project as Project | null;
      const wizardStep = (additional_context?.wizardStep as string) || 'ideation';
      systemPrompt = getCreatePrompt(user_context, project, wizardStep);
      break;

    default:
      throw new Error(`Unknown context type: ${context_type}`);
  }

  try {
    const stream = await anthropic.messages.stream({
      model: MODELS.default,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        ...formatMessagesForAPI(conversation_history),
        { role: 'user', content: user_message },
      ],
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        yield event.delta.text;
      }
    }
  } catch (error) {
    console.error('Stream Error:', error);
    throw new Error('Failed to stream AI response. Please try again.');
  }
}
