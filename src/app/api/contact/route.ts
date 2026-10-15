import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Access Key for Web3Forms (supports public access_key or env variable)
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';

    // Dispatch directly to Web3Forms API
    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        from_name: `${name} (Azhar Portfolio Inquiry)`,
        subject: `New Portfolio Message from ${name}`,
        to_email: 'azharuddin.au543@gmail.com',
      }),
    });

    const result = await web3Response.json();

    if (!result.success) {
      console.warn('Web3Forms dispatch response:', result);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. I will get back to you within 24 hours.',
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
