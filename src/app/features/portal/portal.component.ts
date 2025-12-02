import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent {
  private authService = inject(AuthService);

  user$ = this.authService.user$;
  profile = signal<any>(null);
  isLoading = signal(true);

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading.set(false);
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
