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
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const userStr = params['user'];

      if (token && userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));
          this.authService.handleAuthCallback(token, user);
          this.router.navigate(['/home']);
        } catch (error) {
          console.error('Error parsing user data:', error);
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
