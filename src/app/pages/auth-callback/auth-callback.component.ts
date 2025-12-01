import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500"
    >
      <div class="text-center backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/20">
        <div class="relative">
          <div
            class="animate-spin rounded-full h-20 w-20 border-b-4 border-white mx-auto mb-6"
          ></div>
          <div class="absolute inset-0 rounded-full border-4 border-white/20 animate-ping"></div>
        </div>
        <p class="text-white text-xl font-semibold drop-shadow-lg">Completing your sign in...</p>
        <p class="text-white/80 mt-2">Just a moment</p>
      </div>
    </div>
  `,
  imports: [],
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('AuthCallbackComponent - constructor called');
    console.log('Current URL:', window.location.href);
  }

  ngOnInit() {
    console.log('AuthCallbackComponent - ngOnInit called');
    this.route.queryParams.subscribe((params) => {
      console.log('Raw queryParams:', params);
      const token = params['token'];
      const userStr = params['user'];

      console.log('Auth callback - received params:', { token: !!token, user: !!userStr });

      if (token && userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));
          console.log('Auth callback - parsed user:', user);

          // Store auth data
          this.authService.handleAuthCallback(token, user);

          // Use setTimeout to ensure localStorage is written and auth state is updated
          setTimeout(() => {
            console.log('Auth callback - navigating to home');
            this.router.navigate(['/home']).then(
              (success) => console.log('Navigation successful:', success),
              (error) => console.error('Navigation failed:', error)
            );
          }, 100);
        } catch (error) {
          console.error('Error parsing user data:', error);
          this.router.navigate(['/login']);
        }
      } else {
        console.error('Missing token or user data');
        this.router.navigate(['/login']);
      }
    });
  }
}
