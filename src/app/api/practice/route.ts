import { NextRequest, NextResponse } from 'next/server';
import { getAIResponse, reviewCode } from '@/lib/ai/service';
import { createClient } from '@/lib/supabase/server';
import type { AIRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      context_id,
      user_message,
      conversation_history,
      challenge,
      code,
      action, // 'chat' or 'review'
      attempt_number,
    } = body;

    // Handle code review
    if (action === 'review' && code && challenge) {
      const response = await reviewCode(
        code,
        challenge,
        {
          user_id: user.id,
          experience_level: 'beginner',
          completed_modules: [],
        },
        attempt_number || 1
      );

      return NextResponse.json(response);
    }

    // Handle chat
    const aiRequest: AIRequest = {
      context_type: 'practice',
      context_id,
      user_message,
      conversation_history: conversation_history || [],
      user_context: {
        user_id: user.id,
        experience_level: 'beginner',
        completed_modules: [],
      },
      additional_context: {
        challenge,
      },
    };

    const response = await getAIResponse(aiRequest);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Practice API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
