import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  CommitteeService,
  Committee,
  CommitteeMemberWithDesignation,
} from '../../services/committee.service';

@Component({
  selector: 'app-committee-details',
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
            <a
              routerLink="/about"
              class="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >
              About
            </a>
            <a
              routerLink="/committees"
              class="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >
              Committees
            </a>
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
        <!-- Loading State -->
        <section *ngIf="loading" class="py-16 px-4">
          <div class="max-w-7xl mx-auto text-center">
            <div
              class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"
            ></div>
            <p class="mt-4 text-gray-600 text-lg">Loading committee details...</p>
          </div>
        </section>

        <!-- Error State -->
        <section *ngIf="!loading && error" class="py-16 px-4">
          <div class="max-w-4xl mx-auto text-center">
            <i class="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Committee Not Found</h2>
            <p class="text-lg text-gray-600 mb-8">
              The committee you're looking for doesn't exist or has been removed.
            </p>
            <button
              routerLink="/committees"
              class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Back to Committees
            </button>
          </div>
        </section>

        <!-- Committee Details -->
        <section *ngIf="!loading && !error && committee" class="py-16 px-4">
          <div class="max-w-7xl mx-auto">
            <!-- Breadcrumb -->
            <div class="mb-8">
              <nav class="flex items-center gap-2 text-sm text-gray-500">
                <a routerLink="/" class="hover:text-purple-600 transition-colors">Home</a>
                <i class="fas fa-chevron-right text-xs"></i>
                <a routerLink="/committees" class="hover:text-purple-600 transition-colors"
                  >Committees</a
                >
                <i class="fas fa-chevron-right text-xs"></i>
                <span class="text-gray-900 font-semibold">{{ committee.name }}</span>
              </nav>
            </div>

            <!-- Committee Header -->
            <div
              class="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-12 shadow-2xl mb-12"
            >
              <div class="text-white text-center">
                <div
                  *ngIf="committee.isCurrent"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4 backdrop-blur-sm"
                >
                  <i class="fas fa-star"></i>
                  <span class="text-sm font-semibold">Current Committee</span>
                </div>
                <h1 class="text-5xl font-extrabold mb-4">{{ committee.name }}</h1>
                <p class="text-2xl text-purple-100 mb-4">{{ committee.year }} Committee</p>
                <p *ngIf="committee.description" class="text-lg text-purple-100 max-w-3xl mx-auto">
                  {{ committee.description }}
                </p>
                <div class="flex flex-wrap justify-center gap-6 mt-8">
                  <div class="bg-white/20 rounded-2xl px-8 py-4 backdrop-blur-sm">
                    <p class="text-4xl font-bold">{{ committee.designations.length }}</p>
                    <p class="text-purple-100">Designations</p>
                  </div>
                  <div class="bg-white/20 rounded-2xl px-8 py-4 backdrop-blur-sm">
                    <p class="text-4xl font-bold">{{ committee.members.length }}</p>
                    <p class="text-purple-100">Members</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Committee Members by Designation -->
            <div *ngIf="groupedMembers.length > 0">
              <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Committee Members</h2>

              <div class="space-y-12">
                <div
                  *ngFor="let group of groupedMembers"
                  class="bg-white rounded-3xl p-8 shadow-xl"
                >
                  <div class="mb-6">
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ group.designation }}</h3>
                    <div
                      class="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    ></div>
                  </div>

                  <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div
                      *ngFor="let member of group.members"
                      class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-100"
                    >
                      <div class="mb-4">
                        <img
                          *ngIf="member.userId.avatar"
                          [src]="member.userId.avatar"
                          [alt]="member.userId.firstName + ' ' + member.userId.lastName"
                          class="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-purple-200"
                        />
                        <div
                          *ngIf="!member.userId.avatar"
                          class="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-4 ring-purple-200"
                        >
                          <span class="text-3xl text-white font-bold">
                            {{ member.userId.firstName.charAt(0)
                            }}{{ member.userId.lastName.charAt(0) }}
                          </span>
                        </div>
                      </div>
                      <h4 class="text-lg font-bold text-gray-900 mb-2">
                        {{ member.userId.firstName }} {{ member.userId.lastName }}
                      </h4>
                      <p class="text-sm text-gray-500">{{ member.userId.email }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Members State -->
            <div
              *ngIf="groupedMembers.length === 0"
              class="bg-white rounded-3xl p-12 shadow-xl text-center"
            >
              <i class="fas fa-users text-6xl text-gray-300 mb-4"></i>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">No Members Yet</h3>
              <p class="text-gray-600">This committee doesn't have any members assigned yet.</p>
            </div>

            <!-- Back Button -->
            <div class="mt-12 text-center">
              <button
                routerLink="/committees"
                class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <i class="fas fa-arrow-left mr-2"></i>
                Back to All Committees
              </button>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12 px-4 mt-16">
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
                  <a routerLink="/committees" class="hover:text-purple-400 transition-colors"
                    >Committees</a
                  >
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
  styles: [],
})
export class CommitteeDetailsComponent implements OnInit {
  committee: Committee | null = null;
  groupedMembers: { designation: string; members: CommitteeMemberWithDesignation[] }[] = [];
  loading = false;
  error = false;
  committeeId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private committeeService: CommitteeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.committeeId = params['id'];
      if (this.committeeId) {
        this.loadCommitteeDetails();
      }
    });
  }

  loadCommitteeDetails(): void {
    this.loading = true;
    this.error = false;

    this.committeeService.getCommittee(this.committeeId).subscribe({
      next: (committee) => {
        this.committee = committee;
        this.groupMembersByDesignation(committee);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading committee details:', err);
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  groupMembersByDesignation(committee: Committee): void {
    const membersWithDesignations = this.committeeService.getMembersWithDesignations(committee);

    // Group members by designation
    const grouped = new Map<string, CommitteeMemberWithDesignation[]>();

    membersWithDesignations.forEach((member) => {
      const designationName = member.designation.name;
      if (!grouped.has(designationName)) {
        grouped.set(designationName, []);
      }
      grouped.get(designationName)!.push(member);
    });

    // Convert to array format
    this.groupedMembers = Array.from(grouped.entries()).map(([designation, members]) => ({
      designation,
      members,
    }));
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
