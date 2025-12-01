import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-portal',
  imports: [CommonModule],
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
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h1
              class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Alumni Portal
            </h1>
          </div>
          <div class="flex items-center gap-4">
            <button
              (click)="goToHome()"
              class="px-5 py-2.5 text-sm font-semibold text-purple-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Home
            </button>
            <div class="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 shadow-md">
              <img
                *ngIf="currentUser?.avatar"
                [src]="currentUser?.avatar"
                [alt]="currentUser?.firstName"
                class="w-10 h-10 rounded-full ring-2 ring-purple-200"
              />
              <div *ngIf="currentUser" class="text-sm">
                <p class="font-semibold text-gray-900">
                  {{ currentUser.firstName }} {{ currentUser.lastName }}
                </p>
                <p class="text-gray-500 text-xs">{{ currentUser.email }}</p>
              </div>
            </div>
            <button
              (click)="logout()"
              class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Logout
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
            Welcome Back, {{ currentUser?.firstName }}! 🎉
          </h2>
          <p class="text-gray-600 text-xl max-w-2xl mx-auto animate-fade-in-delay">
            Access your personalized dashboard and exclusive alumni features
          </p>
        </div>

        <!-- Quick Stats -->
        <div class="grid md:grid-cols-4 gap-6 mb-12">
          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-purple-100"
          >
            <div class="text-3xl font-bold text-purple-600 mb-2">1,234</div>
            <div class="text-gray-600 text-sm">Alumni Members</div>
          </div>
          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-pink-100"
          >
            <div class="text-3xl font-bold text-pink-600 mb-2">56</div>
            <div class="text-gray-600 text-sm">Active Events</div>
          </div>
          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-orange-100"
          >
            <div class="text-3xl font-bold text-orange-600 mb-2">89</div>
            <div class="text-gray-600 text-sm">Job Opportunities</div>
          </div>
          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-indigo-100"
          >
            <div class="text-3xl font-bold text-indigo-600 mb-2">234</div>
            <div class="text-gray-600 text-sm">Success Stories</div>
          </div>
        </div>

        <!-- Feature Cards -->
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 cursor-pointer"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">My Network</h3>
            <p class="text-gray-600">Connect with alumni from your batch and beyond</p>
          </div>

          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100 cursor-pointer"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Events</h3>
            <p class="text-gray-600">Browse and register for upcoming alumni events</p>
          </div>

          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100 cursor-pointer"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Career Hub</h3>
            <p class="text-gray-600">Explore job opportunities and career resources</p>
          </div>

          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-indigo-100 cursor-pointer"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Resources</h3>
            <p class="text-gray-600">Access mentorship and learning materials</p>
          </div>

          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-teal-100 cursor-pointer"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Announcements</h3>
            <p class="text-gray-600">Stay updated with latest news and updates</p>
          </div>

          <div
            class="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-cyan-100 cursor-pointer"
          >
            <div
              class="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">My Profile</h3>
            <p class="text-gray-600">Manage your profile and preferences</p>
          </div>
        </div>

        <!-- Activity Feed -->
        <div
          class="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-1 shadow-2xl"
        >
          <div class="bg-white rounded-[22px] p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Recent Activity 📊</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              Stay connected with the latest happenings in the alumni community. New features and
              content coming soon!
            </p>
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p class="text-gray-700 text-sm">
                  <span class="font-semibold">John Doe</span> posted a new job opportunity
                </p>
                <span class="text-gray-400 text-xs ml-auto">2 hours ago</span>
              </div>
              <div class="flex items-center gap-3 p-4 bg-pink-50 rounded-xl">
                <div class="w-2 h-2 bg-pink-500 rounded-full"></div>
                <p class="text-gray-700 text-sm">
                  <span class="font-semibold">Alumni Meetup 2025</span> event registered
                </p>
                <span class="text-gray-400 text-xs ml-auto">5 hours ago</span>
              </div>
              <div class="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                <p class="text-gray-700 text-sm">
                  <span class="font-semibold">Jane Smith</span> shared a success story
                </p>
                <span class="text-gray-400 text-xs ml-auto">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </main>
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
export class PortalComponent {
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
  }
}
