# Auth0 Authentication Setup - Public Site

This document explains the Auth0 authentication implementation for the CSEDI Alumni public site.

## Overview

The public site uses Auth0 for authentication with the following features:

- Social login (Google, GitHub, etc.)
- Username/Password authentication
- Protected `/portal` route
- JWT token-based API authentication
- Automatic token injection for API calls

## Architecture

### Components

1. **Auth Service** (`src/app/core/services/auth.service.ts`)

   - Wraps Auth0 SDK functionality
   - Provides authentication methods (login, logout)
   - Handles API calls with automatic token injection
   - Exposes user state observables

2. **Auth Guard** (`src/app/core/guards/auth.guard.ts`)

   - Protects routes requiring authentication
   - Redirects unauthenticated users to Auth0 login
   - Preserves return URL after successful login

3. **Home Component** (`src/app/features/home/home.component.ts`)

   - Public landing page
   - Login/logout UI
   - Shows authenticated user info

4. **Portal Component** (`src/app/features/portal/portal.component.ts`)
   - Protected route (requires authentication)
   - Displays user profile from backend API
   - Shows user roles and permissions

## Configuration

### 1. Auth0 Setup

Create an Auth0 application:

1. Go to [auth0.com](https://auth0.com) and sign in
2. Create a new "Single Page Application"
3. Note your **Domain** and **Client ID**
4. Configure Allowed Callback URLs: `http://localhost:4200`
5. Configure Allowed Logout URLs: `http://localhost:4200`
6. Configure Allowed Web Origins: `http://localhost:4200`

### 2. Environment Configuration

Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  auth0: {
    domain: 'yourapp.us.auth0.com', // Your Auth0 domain
    clientId: 'YOUR_CLIENT_ID', // Your Auth0 client ID
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'https://api.csedialumni.com', // Your API identifier
    },
  },
  apiUrl: 'http://localhost:3000',
};
```

Update `src/environments/environment.prod.ts` with production values.

### 3. Backend Configuration

Ensure your backend is configured with the same Auth0 settings:

- `AUTH0_DOMAIN`: Must match the domain in frontend config
- `AUTH0_AUDIENCE`: Must match the audience in frontend config

## How It Works

### Authentication Flow

1. **User clicks "Login"**

   - `authService.login()` is called
   - Redirects to Auth0 Universal Login
   - User authenticates with chosen method

2. **Auth0 redirects back**

   - Auth0 SDK handles the callback
   - Stores tokens securely
   - Updates `isAuthenticated$` observable

3. **Accessing protected routes**

   - Auth guard checks authentication status
   - If authenticated: allows access
   - If not: redirects to Auth0 login

4. **Making API calls**
   - HTTP interceptor automatically adds JWT token
   - Backend validates token and extracts user info
   - Returns protected data

### Token Management

- Access tokens are automatically managed by Auth0 SDK
- Tokens are renewed silently before expiration
- HTTP interceptor injects tokens for configured API endpoints
- No manual token handling required

## Usage Examples

### Login/Logout

```typescript
import { AuthService } from './core/services/auth.service';

export class MyComponent {
  private authService = inject(AuthService);

  login() {
    this.authService.login('/portal'); // Optional return URL
  }

  logout() {
    this.authService.logout();
  }
}
```

### Check Authentication Status

```typescript
export class MyComponent {
  private authService = inject(AuthService);

  isAuthenticated$ = this.authService.isAuthenticated$;
  user$ = this.authService.user$;
}
```

In template:

```html
@if (isAuthenticated$ | async) {
<p>Welcome, {{ (user$ | async)?.name }}</p>
} @else {
<button (click)="login()">Login</button>
}
```

### Protected Routes

```typescript
export const routes: Routes = [
  {
    path: 'portal',
    component: PortalComponent,
    canActivate: [authGuard], // Requires authentication
  },
];
```

### Making Authenticated API Calls

```typescript
export class MyService {
  private http = inject(HttpClient);

  // Token is automatically injected for configured API URLs
  getUserProfile() {
    return this.http.get(`${environment.apiUrl}/auth/profile`);
  }
}
```

### Check User Roles/Permissions

```typescript
export class MyComponent {
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.hasRole('admin').subscribe((isAdmin) => {
      console.log('Is admin:', isAdmin);
    });

    this.authService.hasPermission('read:users').subscribe((canRead) => {
      console.log('Can read users:', canRead);
    });
  }
}
```

## API Endpoints

The following backend endpoints are used:

- `GET /auth/profile` - Get authenticated user profile
- `GET /auth/me` - Get user details
- `GET /auth/health` - Health check (public)

## Security Features

1. **JWT Token Validation**

   - Backend validates token signature
   - Checks token expiration
   - Verifies audience and issuer

2. **Secure Token Storage**

   - Tokens stored in memory by Auth0 SDK
   - Not exposed to localStorage (XSS protection)

3. **HTTPS Required**

   - Production must use HTTPS
   - Tokens transmitted securely

4. **Token Renewal**
   - Automatic silent token renewal
   - Prevents session expiration

## Troubleshooting

### "Unable to verify JWT signature"

- Verify `AUTH0_DOMAIN` matches in frontend and backend
- Ensure domain includes protocol (https://)
- Check Auth0 tenant is correct

### "Invalid audience"

- Verify `AUTH0_AUDIENCE` matches in frontend and backend
- Check API identifier in Auth0 dashboard
- Ensure audience is included in token request

### Login redirect fails

- Check allowed callback URLs in Auth0 dashboard
- Verify redirect_uri matches exactly
- Check browser console for errors

### API calls not authenticated

- Verify API URL matches configured `allowedList` in `app.config.ts`
- Check that Auth0 interceptor is enabled
- Ensure token is requested with correct audience

## Testing

1. Start the backend: `cd csediualumni-services && npm run start:dev`
2. Start the frontend: `cd csediualumni-public && npm start`
3. Navigate to `http://localhost:4200`
4. Click "Login" to authenticate
5. Try accessing `/portal` (should redirect to login if not authenticated)
6. After login, verify you can access `/portal` and see your profile

## Production Deployment

Before deploying:

1. Update `environment.prod.ts` with production Auth0 credentials
2. Add production URLs to Auth0 allowed URLs
3. Enable HTTPS
4. Configure CORS on backend for production domain
5. Set appropriate token expiration times
6. Enable production logging and monitoring
