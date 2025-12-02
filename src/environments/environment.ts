export const environment = {
  production: false,
  auth0: {
    domain: 'csediualumni.us.auth0.com', // WITHOUT https:// or trailing slash
    clientId: '8cJDXN0svn090g4pqmS99Fqq7sOjYR6o',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'https://api.csedialumni.com', // Your API identifier from Auth0
      scope: 'openid profile email offline_access', // offline_access needed for refresh tokens
    },
    cacheLocation: 'localstorage' as const, // Store tokens in localStorage to persist across refreshes
    useRefreshTokens: true, // Enable refresh tokens
  },
  apiUrl: 'http://localhost:3000',
};
