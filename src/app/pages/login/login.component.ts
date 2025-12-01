import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isHovered = signal(false);
  readonly particles = signal(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  );

  ngOnInit() {
    // Check if already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  setHovered(state: boolean) {
    this.isHovered.set(state);
  }
}
