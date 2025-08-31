# Google OAuth Setup Guide

## 🚀 Quick Setup for Google Sign-In

### Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or Select Project**: 
   - Click "Select a project" → "New Project"
   - Name it "Complaint Management App"
   - Click "Create"

3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click "Enable"

4. **Create OAuth Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Name: "Complaint Management Web Client"

5. **Configure OAuth Settings**:
   - **Authorized JavaScript origins**: `http://localhost:3003`
   - **Authorized redirect URIs**: `http://localhost:3003/api/auth/google/callback`
   - Click "Create"

6. **Copy Credentials**:
   - Copy the "Client ID" and "Client Secret"

### Step 2: Update Environment Variables

Open your `.env.local` file and replace the placeholder values:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=1234567890-abcdefghijk.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_actual_client_secret_here
```

### Step 3: Test Google Sign-In

1. **Start your development server**: `npm run dev`
2. **Visit**: http://localhost:3003/auth/signin
3. **Click "Continue with Google"**
4. **Complete OAuth flow**

### Step 4: Generate NextAuth Secret (Optional)

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Then update your `.env.local`:
```env
NEXTAUTH_SECRET=your_generated_secret_here
```

## 🔧 Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**:
   - Ensure the redirect URI in Google Console exactly matches: `http://localhost:3003/api/auth/google/callback`
   - Check the port number (currently 3003)

2. **"invalid_client" error**:
   - Verify your Client ID and Client Secret are correct
   - Make sure there are no extra spaces

3. **"Google OAuth not configured" error**:
   - Check that `GOOGLE_CLIENT_ID` is set in `.env.local`
   - Restart your development server after updating environment variables

### Testing Without Google OAuth:

You can still test the app using email/password authentication:

**Demo Accounts**:
- Admin: `admin@demo.com` / `password123`
- User: `user@demo.com` / `password123`

Create demo accounts by visiting: http://localhost:3003/api/auth/seed-users (POST request)

## 🎯 Production Setup

For production deployment:

1. **Update authorized origins** in Google Console:
   - Add your production domain: `https://yourdomain.com`

2. **Update redirect URI**:
   - Add: `https://yourdomain.com/api/auth/google/callback`

3. **Update environment variables**:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   ```

## ✅ Features Ready:

- ✅ Custom email/password authentication
- ✅ Google OAuth integration (needs credentials)
- ✅ User registration and login
- ✅ Role-based access control
- ✅ Protected complaint submission
- ✅ Admin dashboard access control
- ✅ Session management
