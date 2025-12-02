import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private authService = inject(AuthService);

  isMenuOpen = false;
  isAuthenticated$ = this.authService.isAuthenticated$;
  user$ = this.authService.user$;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
