import { NextRequest, NextResponse } from 'next/server';
import { getAIResponse } from '@/lib/ai/service';
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
      module,
    } = body;

    // Build the AI request
    const aiRequest: AIRequest = {
      context_type: 'learn',
      context_id,
      user_message,
      conversation_history: conversation_history || [],
      user_context: {
        user_id: user.id,
        experience_level: 'beginner', // Would come from user profile
        completed_modules: [], // Would come from database
        current_module: module?.title,
      },
      additional_context: {
        module,
      },
    };

    const response = await getAIResponse(aiRequest);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Learn API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
