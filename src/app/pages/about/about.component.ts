import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
          <nav class="flex items-center gap-6">
            <a
              routerLink="/"
              class="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >
              Home
            </a>
            <a routerLink="/about" class="text-purple-600 font-semibold"> About </a>
            <button
              (click)="goToLogin()"
              class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      <main>
        <!-- Hero Banner -->
        <section class="relative py-20 px-4 overflow-hidden">
          <div class="max-w-7xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
              <i class="fas fa-info-circle text-purple-600"></i>
              <span class="text-sm font-semibold text-purple-700">About Us</span>
            </div>
            <h1
              class="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight"
            >
              Building Tomorrow's Tech Leaders
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connecting generations of Computer Science & Engineering graduates from Daffodil
              International University to foster growth, collaboration, and innovation.
            </p>
          </div>
          <!-- Decorative Elements -->
          <div
            class="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
          ></div>
        </section>

        <!-- Who We Are -->
        <section class="py-16 px-4 bg-white">
          <div class="max-w-7xl mx-auto">
            <div class="max-w-3xl mx-auto text-center">
              <h2 class="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p class="text-lg text-gray-600 leading-relaxed">
                We are a vibrant community of Computer Science & Engineering alumni from Daffodil
                International University, united by our shared experiences and commitment to
                excellence. Our network spans across industries, continents, and career stages,
                creating a powerful ecosystem of knowledge, support, and opportunity. From recent
                graduates to industry veterans, we stand together to uplift, inspire, and empower
                one another.
              </p>
            </div>
          </div>
        </section>

        <!-- Mission & Vision -->
        <section class="py-16 px-4">
          <div class="max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 gap-8">
              <!-- Mission -->
              <div
                class="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-8 text-white shadow-xl"
              >
                <div
                  class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6"
                >
                  <i class="fas fa-bullseye text-3xl"></i>
                </div>
                <h3 class="text-3xl font-bold mb-4">Our Mission</h3>
                <p class="text-purple-100 leading-relaxed">
                  To create a thriving, connected community of CSE DIU alumni that fosters
                  professional growth, facilitates meaningful collaborations, and provides
                  continuous support throughout every stage of our members' careers. We strive to
                  bridge the gap between education and industry, empowering our alumni to achieve
                  their fullest potential.
                </p>
              </div>

              <!-- Vision -->
              <div
                class="bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl p-8 text-white shadow-xl"
              >
                <div
                  class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6"
                >
                  <i class="fas fa-eye text-3xl"></i>
                </div>
                <h3 class="text-3xl font-bold mb-4">Our Vision</h3>
                <p class="text-pink-100 leading-relaxed">
                  To be recognized as the most influential and supportive alumni network in
                  Bangladesh's tech industry, setting the standard for professional excellence,
                  innovation, and community engagement. We envision a future where every CSE DIU
                  graduate has access to unlimited opportunities for growth, mentorship, and
                  success.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- What We Do -->
        <section class="py-16 px-4 bg-white">
          <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
              <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                We provide a comprehensive suite of services designed to support our alumni
                community at every step of their professional journey.
              </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                *ngFor="let feature of features"
                class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-100"
              >
                <div
                  class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                >
                  <i [class]="feature.icon + ' text-white text-2xl'"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">{{ feature.title }}</h3>
                <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Our Journey (Timeline) -->
        <section class="py-16 px-4">
          <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p class="text-lg text-gray-600">Key milestones in building our alumni community</p>
            </div>

            <div class="relative">
              <!-- Timeline line -->
              <div
                class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 hidden md:block"
              ></div>

              <!-- Timeline items -->
              <div class="space-y-12">
                <div
                  *ngFor="let milestone of milestones; let i = index"
                  [class.md:flex-row-reverse]="i % 2 === 0"
                  class="relative flex flex-col md:flex-row items-center gap-8"
                >
                  <!-- Content -->
                  <div class="flex-1" [class.md:text-right]="i % 2 === 0">
                    <div
                      class="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow border border-purple-100"
                    >
                      <div
                        class="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold mb-3"
                      >
                        {{ milestone.year }}
                      </div>
                      <h3 class="text-xl font-bold text-gray-900 mb-2">
                        {{ milestone.title }}
                      </h3>
                      <p class="text-gray-600">{{ milestone.description }}</p>
                    </div>
                  </div>

                  <!-- Center dot -->
                  <div
                    class="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg z-10 hidden md:block"
                  ></div>

                  <!-- Spacer -->
                  <div class="flex-1 hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Committee / Team Introduction Preview -->
        <section class="py-16 px-4 bg-white">
          <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">Meet Our Committee</h2>
              <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                Dedicated leaders working tirelessly to strengthen our alumni community and create
                lasting value for all members.
              </p>
            </div>

            <div
              class="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-12 text-center text-white shadow-2xl"
            >
              <i class="fas fa-users text-6xl mb-6 opacity-90"></i>
              <h3 class="text-3xl font-bold mb-4">Coming Soon</h3>
              <p class="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                We're currently building our committee structure and will introduce our team members
                soon. Stay tuned to meet the passionate individuals leading our community forward!
              </p>
              <div class="flex flex-wrap justify-center gap-4">
                <div class="px-6 py-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <p class="text-sm font-semibold">President</p>
                </div>
                <div class="px-6 py-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <p class="text-sm font-semibold">Vice President</p>
                </div>
                <div class="px-6 py-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <p class="text-sm font-semibold">Secretary</p>
                </div>
                <div class="px-6 py-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <p class="text-sm font-semibold">Treasurer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 px-4">
          <div class="max-w-4xl mx-auto text-center">
            <div
              class="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-12 shadow-2xl"
            >
              <h2 class="text-4xl font-bold text-white mb-6">Join Our Growing Community</h2>
              <p class="text-xl text-purple-100 mb-8 leading-relaxed">
                Be part of a network that supports your career growth, connects you with industry
                leaders, and creates opportunities for collaboration. Together, we're stronger.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  (click)="goToLogin()"
                  class="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <i class="fas fa-sign-in-alt mr-2"></i>
                  Join Now
                </button>
                <button
                  routerLink="/"
                  class="px-8 py-4 bg-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30"
                >
                  <i class="fas fa-home mr-2"></i>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div
                  class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                >
                  <i class="fas fa-user-graduate text-white"></i>
                </div>
                <h3 class="text-lg font-bold">CSE DIU Alumni</h3>
              </div>
              <p class="text-gray-400 text-sm leading-relaxed">
                Connecting generations of CSE graduates from Daffodil International University.
              </p>
            </div>

            <div>
              <h4 class="font-bold mb-4">Quick Links</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li>
                  <a routerLink="/" class="hover:text-purple-400 transition-colors">Home</a>
                </li>
                <li>
                  <a routerLink="/about" class="hover:text-purple-400 transition-colors">About</a>
                </li>
                <li>
                  <a routerLink="/login" class="hover:text-purple-400 transition-colors">Login</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold mb-4">Contact</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li>
                  <i class="fas fa-envelope mr-2"></i>
                  alumni&#64;diu.edu.bd
                </li>
                <li>
                  <i class="fas fa-phone mr-2"></i>
                  +880 1234-567890
                </li>
                <li>
                  <i class="fas fa-map-marker-alt mr-2"></i>
                  Dhaka, Bangladesh
                </li>
              </ul>
            </div>

            <div>
              <h4 class="font-bold mb-4">Follow Us</h4>
              <div class="flex gap-3">
                <a
                  href="#"
                  class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="#"
                  class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <i class="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 CSE DIU Alumni. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      @keyframes blob {
        0% {
          transform: translate(0px, 0px) scale(1);
        }
        33% {
          transform: translate(30px, -50px) scale(1.1);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
        }
      }

      .animate-blob {
        animation: blob 7s infinite;
      }

      .animation-delay-2000 {
        animation-delay: 2s;
      }
    `,
  ],
})
export class AboutComponent {
  features: Feature[] = [
    {
      icon: 'fas fa-network-wired',
      title: 'Networking',
      description:
        'Connect with fellow alumni across the globe, build meaningful relationships, and expand your professional network.',
    },
    {
      icon: 'fas fa-user-tie',
      title: 'Mentorship',
      description:
        'Access guidance from experienced professionals and give back by mentoring the next generation of tech leaders.',
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Job Referrals',
      description:
        'Discover exclusive job opportunities and provide referrals to help fellow alumni advance their careers.',
    },
    {
      icon: 'fas fa-calendar-check',
      title: 'Reunions & Events',
      description:
        'Participate in annual reunions, tech talks, workshops, and social gatherings to stay connected with your alma mater.',
    },
  ];

  milestones: Milestone[] = [
    {
      year: '2015',
      title: 'The Beginning',
      description:
        'CSE DIU Alumni network was officially founded with 50 founding members, establishing the groundwork for a strong community.',
    },
    {
      year: '2017',
      title: 'First Annual Reunion',
      description:
        'Organized our first major reunion event, bringing together over 200 alumni from different batches and industries.',
    },
    {
      year: '2019',
      title: 'Mentorship Program Launch',
      description:
        'Launched our flagship mentorship program, connecting 100+ mentees with experienced industry professionals.',
    },
    {
      year: '2021',
      title: 'Digital Transformation',
      description:
        'Launched our online portal and mobile app, making it easier for alumni to stay connected virtually during challenging times.',
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description:
        'Expanded our network internationally with active chapters in 5 countries and over 1,000 registered members.',
    },
    {
      year: '2025',
      title: 'Innovation Hub',
      description:
        'Established the CSE DIU Innovation Hub to support alumni startups and entrepreneurial ventures with resources and funding.',
    },
  ];

  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
