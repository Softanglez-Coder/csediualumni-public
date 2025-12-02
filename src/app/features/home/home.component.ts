import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private authService = inject(AuthService);

  isAuthenticated$ = this.authService.isAuthenticated$;
  user$ = this.authService.user$;

  login() {
    this.authService.login('/portal');
  }

  logout() {
    this.authService.logout();
  }
}
