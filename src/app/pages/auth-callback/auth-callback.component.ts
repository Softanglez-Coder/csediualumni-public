import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCallbackComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    console.log('AuthCallbackComponent - ngOnInit called');
    console.log('Current URL:', window.location.href);

    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
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
