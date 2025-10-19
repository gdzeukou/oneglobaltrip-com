# One GlobalTrip - Branded Google OAuth Runbook

**Complete setup guide for custom-branded Google OAuth using Supabase Auth with custom domain**

## Tech Stack
- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Auth Flow**: Supabase Auth with Google OAuth (custom credentials)
- **Routing**: React Router v6

## Brand Identity
- **App Name**: One GlobalTrip (OGT)
- **Primary Color**: Royal Blue `#0040ff`
- **Accent Color**: Gold `#f9c642`
- **Domain**: `oneglobaltrip.com`
- **Custom Auth Domain**: `auth.oneglobaltrip.com`

---

## Environment Variables

### Required Variables (set in Lovable Project Settings → Environment Variables)

```bash
# Supabase Configuration (already configured)
VITE_SUPABASE_URL=https://sdeyqojklszwarfrputz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=sdeyqojklszwarfrputz

# Custom Auth Domain (for branded OAuth)
VITE_AUTH_DOMAIN=https://auth.oneglobaltrip.com

# Site URL (production)
VITE_SITE_URL=https://oneglobaltrip.com

# Google OAuth (custom credentials - DO NOT COMMIT)
VITE_GOOGLE_CLIENT_ID=<your-google-client-id>
```

> **Security Note**: The `VITE_GOOGLE_CLIENT_ID` is a **public identifier** and safe to expose on the client. The **Client Secret** should ONLY be configured in Supabase dashboard (never in frontend code).

---

## Setup Steps

### A) Supabase Configuration

#### 1. Custom Auth Domain Setup
**In Supabase Dashboard → Settings → Custom Domains:**

1. Click **"Add custom domain"**
2. Enter domain: `auth.oneglobaltrip.com`
3. Add DNS CNAME record at your domain registrar:
   ```
   Type: CNAME
   Name: auth.oneglobaltrip.com
   Value: sdeyqojklszwarfrputz.supabase.co
   TTL: 3600 (or Auto)
   ```
4. Wait for DNS propagation (5-60 minutes)
5. Wait for SSL certificate to provision (Status: "Active")

**Verify**: Visit `https://auth.oneglobaltrip.com/auth/v1/health` - should return `{"status":"ok"}`

#### 2. Auth URL Configuration
**In Supabase Dashboard → Authentication → URL Configuration:**

Set the following URLs:

- **Site URL**: `https://oneglobaltrip.com`

- **Redirect URLs** (add both):
  ```
  https://oneglobaltrip.com/*
  https://auth.oneglobaltrip.com/auth/v1/callback
  ```

> **Critical**: The OAuth callback **must** include the custom auth domain path

#### 3. Google Provider Setup
**In Supabase Dashboard → Authentication → Providers → Google:**

1. **Enable** Google provider
2. Select **"Use your own credentials"** (NOT Supabase's default)
3. You'll configure Client ID/Secret in step B3 below

---

### B) Google Cloud Console Setup

#### 1. Create/Configure OAuth Consent Screen

**In Google Cloud Console → APIs & Services → OAuth consent screen:**

1. **User Type**: External (for public app) or Internal (for workspace)
2. **App Information**:
   - App name: `One GlobalTrip`
   - User support email: `<your-support-email>`
   - App logo: Upload OGT logo (120x120px minimum)
3. **App domain**:
   - Application home page: `https://oneglobaltrip.com`
   - Privacy policy: `https://oneglobaltrip.com/privacy`
   - Terms of service: `https://oneglobaltrip.com/terms`
4. **Authorized domains**:
   - Add: `oneglobaltrip.com`
   - Add: `supabase.co` (required for custom auth domain)
5. **Scopes**: Add standard scopes
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
6. **Publishing status**: 
   - Testing: Limited to test users
   - **Published**: Available to all users (requires verification)

**Domain Verification** (if required):
- Go to **Google Search Console** → Add property → Verify ownership of `oneglobaltrip.com`

#### 2. Create OAuth 2.0 Client ID

**In Google Cloud Console → APIs & Services → Credentials:**

1. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
2. **Application type**: Web application
3. **Name**: `One GlobalTrip Web Client`
4. **Authorized JavaScript origins**:
   ```
   https://oneglobaltrip.com
   https://auth.oneglobaltrip.com
   ```
5. **Authorized redirect URIs**:
   ```
   https://auth.oneglobaltrip.com/auth/v1/callback
   ```
   > **Important**: This MUST be the custom auth domain Supabase callback endpoint

6. Click **"CREATE"**
7. Save the **Client ID** and **Client Secret**

#### 3. Configure Credentials in Supabase

**In Supabase Dashboard → Authentication → Providers → Google:**

1. Paste **Client ID** from step B2
2. Paste **Client Secret** from step B2
3. Click **"Save"**

---

### C) Frontend Implementation

#### Current Implementation Status ✅

The app already includes:

1. **Supabase Client** (`src/integrations/supabase/client.ts`)
   - Pre-configured with correct settings
   - Auth persistence enabled
   - PKCE flow enabled

2. **Auth Context** (`src/contexts/AuthContext.tsx`)
   - `signInWithGoogle()` method available
   - `signInWithFacebook()` method available
   - Session management with auto-refresh

3. **Auth Service** (`src/contexts/auth/authService.ts`)
   - `signInWithProvider()` handles OAuth flow
   - Redirects to `/auth/callback` after authentication

4. **Auth Callback Handler** (`src/pages/AuthCallback.tsx`)
   - Processes OAuth redirect
   - Extracts tokens from URL
   - Establishes session
   - Redirects to dashboard on success

5. **Protected Routes** (`src/components/auth/ProtectedRoute.tsx`)
   - Guards dashboard and authenticated pages
   - Redirects unauthenticated users

#### Auth Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ 1. User clicks "Continue with Google" on /auth             │
│    ↓                                                        │
│ 2. supabase.auth.signInWithOAuth({ provider: 'google' })  │
│    ↓                                                        │
│ 3. Redirect to Google consent screen                       │
│    (Shows: "One GlobalTrip" + oneglobaltrip.com domain)   │
│    ↓                                                        │
│ 4. User approves → Google redirects to:                    │
│    https://auth.oneglobaltrip.com/auth/v1/callback        │
│    ↓                                                        │
│ 5. Supabase processes auth → redirects to:                 │
│    https://oneglobaltrip.com/auth/callback#tokens          │
│    ↓                                                        │
│ 6. AuthCallback component extracts tokens                  │
│    ↓                                                        │
│ 7. supabase.auth.setSession(tokens)                        │
│    ↓                                                        │
│ 8. Redirect to /dashboard (user authenticated)             │
└─────────────────────────────────────────────────────────────┘
```

---

### D) Deployment & Testing

#### 1. Deploy to Lovable

1. **Set Environment Variables** in Lovable:
   - Project Settings → Environment Variables
   - Add all variables from section "Environment Variables" above

2. **Deploy**:
   - Click **Publish** in Lovable
   - Connect custom domain `oneglobaltrip.com`
   - Wait for DNS and SSL to activate

#### 2. Test the Flow

**Testing Checklist:**

- [ ] Visit `https://oneglobaltrip.com/auth`
- [ ] Click **"Continue with Google"**
- [ ] Google consent screen shows:
  - ✅ App name: "One GlobalTrip"
  - ✅ Domain: oneglobaltrip.com or auth.oneglobaltrip.com
  - ✅ OGT logo (if uploaded)
- [ ] Approve permissions
- [ ] Redirected to `/auth/callback`
- [ ] Successfully redirected to `/dashboard`
- [ ] User email displayed in dashboard
- [ ] Sign out works correctly
- [ ] Can sign back in successfully

#### 3. Testing with Localhost

For local development:

1. Add to Google OAuth Client **Authorized JavaScript origins**:
   ```
   http://localhost:5173
   ```

2. Add to Google OAuth Client **Authorized redirect URIs**:
   ```
   https://auth.oneglobaltrip.com/auth/v1/callback
   ```
   (Keep using production auth domain even in dev)

3. Run locally:
   ```bash
   npm run dev
   ```

4. Test flow at `http://localhost:5173/auth`

---

## Troubleshooting

### Issue: Google shows Supabase domain instead of oneglobaltrip.com

**Cause**: Using Supabase's default Google OAuth credentials instead of custom credentials

**Fix**:
1. Verify you selected "Use your own credentials" in Supabase
2. Confirm your Client ID/Secret are entered in Supabase dashboard
3. Clear browser cache and test again

---

### Issue: "redirect_uri_mismatch" error

**Cause**: Google redirect URI doesn't match configured URIs

**Fix**:
1. Check Google Cloud Console → Credentials → Your OAuth Client
2. Verify **Authorized redirect URIs** includes:
   ```
   https://auth.oneglobaltrip.com/auth/v1/callback
   ```
3. Ensure no typos or trailing slashes
4. Wait 5 minutes for Google to propagate changes

---

### Issue: "Custom domain SSL certificate pending"

**Cause**: DNS not propagated or incorrect CNAME record

**Fix**:
1. Verify CNAME record: `dig auth.oneglobaltrip.com` should show Supabase URL
2. Wait up to 60 minutes for DNS propagation
3. Use [DNS Checker](https://dnschecker.org) to verify global propagation
4. Contact Supabase support if >24 hours

---

### Issue: "Error setting session" after OAuth redirect

**Cause**: Session establishment failure or CORS issue

**Fix**:
1. Check browser console for detailed errors
2. Verify Supabase redirect URLs include your domain
3. Ensure cookies are enabled
4. Check if third-party cookies are blocked
5. Review `AuthCallback.tsx` logs in console

---

### Issue: User stuck on /auth/callback loading screen

**Cause**: Session verification retry logic timeout

**Fix**:
1. Check if user is created in Supabase → Authentication → Users
2. Review browser console logs for session errors
3. Try signing out and in again
4. Clear browser storage and retry

---

## Security Best Practices

### ✅ DO:
- Store Google Client Secret **only** in Supabase dashboard
- Use environment variables for all configuration
- Enable email verification for new users
- Implement rate limiting on auth endpoints
- Monitor auth logs in Supabase dashboard
- Use HTTPS for all domains
- Set appropriate session timeout durations

### ❌ DON'T:
- Commit `.env` or `.env.local` files to Git
- Expose Client Secret in frontend code
- Use default Supabase Google credentials (won't show your brand)
- Skip email verification for production
- Allow unlimited sign-in attempts
- Use HTTP for custom domains

---

## Monitoring & Maintenance

### Regular Checks:
- [ ] Google OAuth consent screen still published
- [ ] SSL certificates valid (auto-renewed by Supabase)
- [ ] No auth errors in Supabase logs
- [ ] Custom domain DNS records unchanged
- [ ] Privacy policy & ToS links accessible

### Supabase Dashboard Links:
- Auth Providers: https://supabase.com/dashboard/project/sdeyqojklszwarfrputz/auth/providers
- Users: https://supabase.com/dashboard/project/sdeyqojklszwarfrputz/auth/users
- Auth Logs: https://supabase.com/dashboard/project/sdeyqojklszwarfrputz/logs/auth-logs
- Custom Domains: https://supabase.com/dashboard/project/sdeyqojklszwarfrputz/settings/general

---

## Key Differences from Default Setup

| Aspect | Default Supabase OAuth | Branded OAuth (This Setup) |
|--------|------------------------|----------------------------|
| Consent Screen App Name | "Supabase" or generic | **"One GlobalTrip"** |
| Domain Shown | `<random>.supabase.co` | **`oneglobaltrip.com`** |
| OAuth Credentials | Supabase's shared | **Your own custom** |
| Custom Auth Domain | No | **`auth.oneglobaltrip.com`** |
| Brand Logo | No | **Your logo** |
| User Trust | Lower | **Higher** |

---

## Appendix: Manual Testing Commands

### Verify DNS:
```bash
dig auth.oneglobaltrip.com
# Should CNAME to sdeyqojklszwarfrputz.supabase.co
```

### Check SSL:
```bash
curl https://auth.oneglobaltrip.com/auth/v1/health
# Should return: {"status":"ok"}
```

### Test OAuth Redirect:
```bash
# This URL should redirect to Google OAuth
https://auth.oneglobaltrip.com/auth/v1/authorize?provider=google
```

---

## Support & Resources

- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth
- **Google OAuth Setup**: https://support.google.com/cloud/answer/6158849
- **Lovable Docs**: https://docs.lovable.dev
- **DNS Checker**: https://dnschecker.org
- **SSL Labs Test**: https://www.ssllabs.com/ssltest/

---

**Last Updated**: 2025-10-19  
**Project**: One GlobalTrip (OGT)  
**Supabase Project**: sdeyqojklszwarfrputz  
**Auth Stack**: React + Vite + Supabase + Google OAuth
