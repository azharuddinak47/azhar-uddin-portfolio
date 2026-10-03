import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Process inquiry (e.g. forward to email service, database, or webhook)
    console.log('New Portfolio Inquiry received:', { name, email, budget, message });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. I will get back to you within 24 hours.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
