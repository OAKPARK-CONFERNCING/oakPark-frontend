# Google OAuth Integration Guide

## Overview
This implementation provides Google OAuth authentication for your OakPark application.

## Setup Complete ✅

### Files Modified/Created:
1. **API Configuration** (`src/api/apiconfig.ts`)
   - Added Google OAuth functions
   - Updated API endpoints to use `/api/v1/` prefix
   - Enhanced error handling

2. **Sign-in Component** (`src/components/sign-in.tsx`)
   - Added Google OAuth button functionality
   - Integrated with backend login API
   - Added loading states and error handling

3. **Create Account Component** (`src/components/createAcct.tsx`)
   - Connected to backend API for account creation
   - Added success/error notifications
   - Redirects to dashboard on success

4. **Google Callback Component** (`src/components/GoogleCallback.tsx`)
   - Handles OAuth redirect from Google
   - Processes authorization code
   - Manages authentication state

5. **App Router** (`src/App.tsx`)
   - Added `/auth/google/callback` route

## How Google OAuth Works:

### User Flow:
1. User clicks "Continue with Google" button
2. Browser redirects to Google OAuth URL: `https://video-conferencing-ne35.onrender.com/api/v1/auth/google`
3. Google handles authentication
4. Google redirects back to your backend: `https://video-conferencing-ne35.onrender.com/api/v1/auth/google/redirect?code=AUTHORIZATION_CODE`
5. Your backend processes the code and redirects to frontend: `http://localhost:5175/auth/google/callback?token=AUTH_TOKEN`
6. Frontend sends token to `/api/v1/auth/google/userdata` endpoint to get user data and final auth token
7. User gets access token and is redirected to `/dashboard`

### Backend Requirements:
Your backend should handle these endpoints:
- `POST /api/v1/auth/account/create` - Create new account
- `POST /api/v1/auth/login` - Regular login
- `GET /api/v1/auth/google` - Redirect to Google OAuth
- `POST /api/v1/auth/google/userdata` - Exchange auth token for user data and final access token

### Environment Variables:
```env
VITE_BASE_URL=https://video-conferencing-ne35.onrender.com/
VITE_GOOGLE_OAUTH_URL=https://video-conferencing-ne35.onrender.com/api/v1/auth/google
VITE_GOOGLE_REDIRECT_URL=https://video-conferencing-ne35.onrender.com/api/v1/auth/google/redirect
```

### Features:
- ✅ Google OAuth integration
- ✅ Regular email/password authentication
- ✅ Account creation
- ✅ Toast notifications for success/error states
- ✅ Loading states
- ✅ Automatic token management
- ✅ Error handling
- ✅ Redirect to dashboard on success

## Testing:
1. Start the development server: `npm run dev`
2. Open http://localhost:5174/
3. Click "Create Account" or "Log in" buttons
4. Test Google OAuth by clicking "Continue with Google"

## Notes:
- The Google OAuth URL in your .env points to your production backend
- Make sure your backend is configured to redirect back to your frontend callback URL
- For development, the callback should redirect to `http://localhost:5174/auth/google/callback`
- For production, update the callback URL accordingly
