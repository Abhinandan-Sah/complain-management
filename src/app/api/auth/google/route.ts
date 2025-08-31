import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    
    if (!googleClientId) {
      return NextResponse.json(
        { error: 'Google OAuth not configured. Please check AUTH_SETUP.md' },
        { status: 500 }
      );
    }

    const redirectUri = `${baseUrl}/api/auth/google/callback`;
    const scope = 'openid email profile';
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
      client_id: googleClientId,
      redirect_uri: redirectUri,
      scope,
      response_type: 'code',
      access_type: 'offline',
      prompt: 'select_account',
    })}`;

    return NextResponse.redirect(googleAuthUrl);
  } catch (error) {
    console.error('Google OAuth initiation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Google OAuth' },
      { status: 500 }
    );
  }
}
