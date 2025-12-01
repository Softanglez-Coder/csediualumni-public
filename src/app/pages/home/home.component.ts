import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FooterComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <!-- Header -->
      <header
        class="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-purple-100"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <i class="fas fa-user-graduate text-white text-xl"></i>
            </div>
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              CSE DIU Alumni
            </h1>
          </div>
          <div class="flex items-center gap-4">
            <div
              *ngIf="currentUser"
              class="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 shadow-md"
            >
              <img
                *ngIf="currentUser?.avatar"
                [src]="currentUser?.avatar"
                [alt]="currentUser?.firstName"
                class="w-10 h-10 rounded-full ring-2 ring-purple-200"
              />
              <div class="text-sm">
                <p class="font-semibold text-gray-900">
                  {{ currentUser.firstName }} {{ currentUser.lastName }}
                </p>
                <p class="text-gray-500 text-xs">{{ currentUser.email }}</p>
              </div>
            </div>
            <button
              *ngIf="currentUser"
              (click)="goToPortal()"
              class="px-5 py-2.5 text-sm font-semibold text-purple-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Go to Portal
            </button>
            <button
              *ngIf="currentUser"
              (click)="logout()"
              class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Logout
            </button>
            <button
              *ngIf="!currentUser"
              (click)="login()"
              class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Hero Section -->
        <div class="text-center mb-12 space-y-4">
          <h2
            class="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent animate-fade-in"
          >
            {{ currentUser ? 'Welcome Back!' : 'Welcome to CSE DIU Alumni Network' }} 🎉
          </h2>
          <p class="text-gray-600 text-xl max-w-2xl mx-auto animate-fade-in-delay">
            Connect with fellow alumni, share experiences, and grow together
          </p>
        </div>

        <!-- Feature Cards -->
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <i class="fas fa-users text-white text-3xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Connect</h3>
            <p class="text-gray-600">Network with alumni from your batch and beyond</p>
          </div>

          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <i class="fas fa-share-nodes text-white text-3xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Share</h3>
            <p class="text-gray-600">Share your experiences and insights with the community</p>
          </div>

          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <i class="fas fa-chart-line text-white text-3xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Grow</h3>
            <p class="text-gray-600">Access resources and opportunities for growth</p>
          </div>
        </div>

        <!-- Welcome Message -->
        <div
          class="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-1 shadow-2xl"
        >
          <div class="bg-white rounded-[22px] p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              {{ currentUser ? "You're all set! ✨" : 'Join Our Community! ✨' }}
            </h3>
            <p class="text-gray-600 leading-relaxed" *ngIf="currentUser">
              Welcome to the CSE DIU Alumni Network. You're now part of a vibrant community of
              talented individuals. Start exploring, connecting, and making the most of your
              membership. If you need any help, don't hesitate to reach out!
            </p>
            <p class="text-gray-600 leading-relaxed" *ngIf="!currentUser">
              Discover a vibrant community of CSE DIU alumni. Login to access exclusive features,
              connect with fellow graduates, and unlock opportunities for networking and growth.
              Your journey with our community starts with a simple click!
            </p>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `,
  styles: [
    `
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in {
        animation: fade-in 0.8s ease-out;
      }

      .animate-fade-in-delay {
        animation: fade-in 0.8s ease-out 0.2s both;
      }
    `,
  ],
})
export class HomeComponent {
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  goToPortal() {
    this.router.navigate(['/portal']);
  }

  logout() {
    this.authService.logout();
  }
}
