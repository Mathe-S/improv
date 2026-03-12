"use server"

import { Resend } from 'resend';

// Provide a mock instance if there's no API key to prevent immediate crashes,
// but usually it requires a valid API key for actual sending.
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function joinCommunity(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'Email is required' };
  }

  try {
    // Send email to the person joining
    const data = await resend.emails.send({
      from: 'Impro Community <onboarding@resend.dev>',
      to: email,
      subject: "Welcome to the Impro!",
      html: `
        <h1>Welcome to the Impro!</h1>
        <p>Thank you for joining the community. We are excited to have you.</p>
        <p>Stay tuned for updates on our new journaling and sharing features.</p>
        <br/>
        <p>Best regards,<br/>The Impro Team</p>
      `,
    });

    // Send email to the owner
    const data2 = await resend.emails.send({
      from: 'Impro Community <onboarding@resend.dev>',
      to: "Sharvadzemat@gmail.com",
      subject: "New user",
      html: `
        <h1>Somebody joined the Impro community!</h1>
        <p>The user with email ${email} joined the Impro community.</p>
        <br/>
        <p>Best regards,<br/>The Impro Team</p>
      `,
    });

    if (data.error) {
      return { error: data.error.message };
    }

    return { success: true };
  } catch (error) {
    return { error: 'Failed to send welcome email' };
  }
}
