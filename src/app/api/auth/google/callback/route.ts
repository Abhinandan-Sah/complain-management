import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.redirect(new URL('/auth/signin?error=oauth_failed', request.url));
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/google/callback`,
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      return NextResponse.redirect(new URL('/auth/signin?error=oauth_failed', request.url));
    }

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const googleUser = await userResponse.json();

    // Here you would typically:
    // 1. Check if user exists in your database
    // 2. Create user if they don't exist
    // 3. Set session/JWT token
    // 4. Redirect to dashboard

    // For now, redirect to success page with user info
    return NextResponse.redirect(
      new URL(`/auth/signin?success=google&email=${googleUser.email}&name=${googleUser.name}`, request.url)
    );

  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(new URL('/auth/signin?error=oauth_failed', request.url));
  }
}
