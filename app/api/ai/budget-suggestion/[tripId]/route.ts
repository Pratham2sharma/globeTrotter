import { NextRequest, NextResponse } from 'next/server';
import { generateBudgetSuggestion } from '@/server/controllers/aiController';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tripId: string }> }
) {
  try {
    const { tripId } = await params;
    const suggestion = await generateBudgetSuggestion(tripId);
    return NextResponse.json(suggestion);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Failed to generate AI suggestions' },
      { status: 500 }
    );
  }
}