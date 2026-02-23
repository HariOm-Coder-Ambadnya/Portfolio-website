import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // 1. Validate environment variables
        if (!process.env.RESEND_API_KEY) {
            console.error('Missing RESEND_API_KEY in environment variables');
            return NextResponse.json(
                { error: 'Server configuration error. Please check environment variables.' },
                { status: 500 }
            );
        }

        // 2. Validate inputs
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const contactEmail = process.env.CONTACT_EMAIL || 'your_email@example.com';
        const resend = new Resend(process.env.RESEND_API_KEY);

        // 3. Send email
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [contactEmail],
            subject: `New Contact Form Submission from ${name}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h2 style="border-bottom: 2px solid #f8f6f1; padding-bottom: 10px;">New Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <div style="background: #f8f6f1; padding: 20px; border-radius: 12px; margin-top: 20px;">
                        <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Error Details:', error);
            // Provide more specific feedback for common errors
            const errorMessage = error.name === 'validation_error'
                ? 'Invalid email data. For testing, ensure you are sending to your own verified email.'
                : 'Failed to send email. Ensure your API key is correct.';

            return NextResponse.json(
                { error: errorMessage },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, id: data?.id },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
