# Authentication Setup Instructions

Since NextAuth.js requires additional configuration, here's how to complete the authentication setup:

## Step 1: Install NextAuth.js
```bash
npm install next-auth @auth/mongodb-adapter
```

## Step 2: Set up Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Set authorized origins: `http://localhost:3000`
6. Set authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret to your `.env.local`

## Step 3: Update Environment Variables
```env
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Step 4: Generate NextAuth Secret
Run this command to generate a secret:
```bash
openssl rand -base64 32
```

## Alternative: Manual Authentication
If you prefer not to use NextAuth.js, you can:
1. Use the registration API at `/api/auth/register`
2. Create a simple login form that stores user session in localStorage
3. Implement JWT tokens manually

## Features Included:
- ✅ User registration with email/password
- ✅ Password hashing with bcrypt
- ✅ User model with roles (user/admin)
- ✅ Protected admin routes
- ✅ Google OAuth ready (needs configuration)
- ✅ Session management
- ✅ Authentication-protected complaint submission

## Usage:
1. Users must sign up/sign in to submit complaints
2. Admin users can access the admin dashboard
3. Regular users can only submit complaints
4. Google OAuth provides easy sign-in option
