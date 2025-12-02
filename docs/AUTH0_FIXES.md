# Fixing Auth0 Issues

## Issues Fixed

### 1. User Not Saved to Database ✅

**Problem:** Users created in Auth0 were not being saved to MongoDB.

**Solution:** Updated `AuthController` to call `usersService.findOrCreate()` in both `/auth/profile` and `/auth/me` endpoints. Now every time a user authenticates, they are automatically created/updated in the database.

### 2. Session Lost on Page Refresh ✅

**Problem:** Users were logged out when refreshing the page.

**Root Causes:**

- Auth0 domain had `https://` prefix (should be just the domain)
- Missing `cacheLocation: 'localstorage'` configuration
- Missing `useRefreshTokens: true` configuration
- Audience mismatch between frontend and backend

**Solutions Applied:**

1. Fixed `domain` format: `'csediualumni.us.auth0.com'` (no https:// or trailing slash)
2. Added `cacheLocation: 'localstorage'` to persist tokens across refreshes
3. Added `useRefreshTokens: true` to enable refresh token rotation
4. Updated backend `AUTH0_AUDIENCE` to match frontend: `https://api.csedialumni.com`

## What Changed

### Backend (`csediualumni-services`)

- **auth.module.ts**: Imported `UsersModule`
- **auth.controller.ts**: Injected `UsersService` and call `findOrCreate()` in endpoints
- **.env**: Updated `AUTH0_AUDIENCE=https://api.csedialumni.com`

### Frontend (`csediualumni-public`)

- **environment.ts**:
  - Fixed domain format (removed https://)
  - Added `cacheLocation: 'localstorage'`
  - Added `useRefreshTokens: true`
  - Fixed audience to match backend
- **app.config.ts**: Pass `cacheLocation` and `useRefreshTokens` to Auth0 provider
- **auth.service.ts**: Updated return type for `getUserProfile()`

## Testing

1. **Restart the backend** (important - to pick up new .env):

   ```bash
   cd csediualumni-services
   # Stop current process (Ctrl+C)
   npm run start:dev
   ```

2. **Clear browser storage** (to remove old invalid tokens):

   - Open DevTools (F12)
   - Application tab → Storage → Clear site data
   - Or just use Incognito/Private window

3. **Restart frontend**:

   ```bash
   cd csediualumni-public
   npm start
   ```

4. **Test the flow**:
   - Login at http://localhost:4200
   - Navigate to /portal
   - Check MongoDB - user should be created
   - **Refresh the page** - should stay logged in ✅
   - Check browser's Application → Local Storage → you should see Auth0 tokens

## Verification

### Check User in Database

```bash
# In MongoDB shell or Compass
db.users.find({ email: "your-email@example.com" })
```

You should see:

- `auth0Id`: Your Auth0 user ID
- `email`: Your email
- `name`: Your name
- `lastLoginAt`: Recent timestamp
- `roles`: Default roles

### Check Token Persistence

1. Open DevTools → Application → Local Storage
2. Look for keys starting with `@@auth0spajs@@`
3. These contain your encrypted tokens

## Important Notes

### Auth0 Dashboard Configuration

Make sure your Auth0 Application has:

- **Allowed Callback URLs**: `http://localhost:4200`
- **Allowed Logout URLs**: `http://localhost:4200`
- **Allowed Web Origins**: `http://localhost:4200`
- **Application Type**: Single Page Application
- **Token Endpoint Authentication Method**: None

### API Settings in Auth0

Make sure your Auth0 API has:

- **Identifier**: `https://api.csedialumni.com` (matches audience)
- **Enable Offline Access**: ✅ (for refresh tokens)
- **Allow Skipping User Consent**: ✅ (optional, for smoother UX)

## Why It Works Now

1. **Tokens are persisted**: Using localStorage instead of memory-only storage
2. **Refresh tokens enabled**: Can renew access tokens without re-login
3. **Domain format correct**: Auth0 SDK can properly construct API URLs
4. **Audience matches**: Frontend and backend agree on the API identifier
5. **User auto-created**: Every authenticated request ensures user exists in DB

## Troubleshooting

If you still have issues:

1. **Clear all browser data** for localhost:4200
2. **Check browser console** for Auth0 errors
3. **Check backend logs** for JWT validation errors
4. **Verify .env** was reloaded (restart backend)
5. **Check Auth0 dashboard** for application settings
