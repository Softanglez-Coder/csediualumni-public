import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- About Section -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div
                class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg"
              >
                <i class="fas fa-user-graduate text-white text-xl"></i>
              </div>
              <h3 class="text-xl font-bold">CSE DIU Alumni</h3>
            </div>
            <p class="text-purple-200 text-sm leading-relaxed">
              Connecting alumni of the Department of Computer Science & Engineering, Dhaka
              International University. Building a strong network for professional growth and
              collaboration.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold mb-4 text-pink-200">Quick Links</h4>
            <ul class="space-y-2">
              <li *ngFor="let link of quickLinks">
                <a
                  [href]="link.url"
                  class="text-purple-200 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <i
                    class="fas {{
                      link.icon
                    }} text-sm group-hover:translate-x-1 transition-transform duration-200"
                  ></i>
                  {{ link.name }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Information -->
          <div>
            <h4 class="text-lg font-semibold mb-4 text-pink-200">Contact Us</h4>
            <ul class="space-y-3">
              <li *ngFor="let contact of contactInfo" class="flex items-start gap-3">
                <div class="mt-1">
                  <i class="fas {{ contact.icon }} text-purple-300 text-lg"></i>
                </div>
                <div>
                  <p class="text-purple-200 text-sm font-medium">{{ contact.label }}</p>
                  <a
                    *ngIf="contact.link"
                    [href]="contact.link"
                    class="text-white text-sm hover:text-pink-200 transition-colors duration-200"
                  >
                    {{ contact.value }}
                  </a>
                  <p *ngIf="!contact.link" class="text-white text-sm">{{ contact.value }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Social Links & University Info -->
          <div>
            <h4 class="text-lg font-semibold mb-4 text-pink-200">Connect With Us</h4>
            <div class="flex gap-3 mb-6">
              <a
                *ngFor="let social of socialLinks"
                [href]="social.url"
                target="_blank"
                rel="noopener noreferrer"
                [title]="social.name"
                class="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <i class="fab {{ social.icon }} text-lg"></i>
              </a>
            </div>

            <!-- University Reference -->
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h5 class="text-sm font-semibold mb-2 text-pink-200">Affiliated With</h5>
              <a
                href="https://www.diu.ac/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-white hover:text-pink-200 transition-colors duration-200 font-medium"
              >
                Dhaka International University
              </a>
              <p class="text-purple-200 text-xs mt-1">
                Department of Computer Science & Engineering
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div
          class="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-purple-200 text-sm text-center md:text-left">
            &copy; {{ currentYear }} CSE DIU Alumni Network. All rights reserved.
          </p>
          <div class="flex gap-6 text-sm">
            <a href="#" class="text-purple-200 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" class="text-purple-200 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" class="text-purple-200 hover:text-white transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [``],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { name: 'Home', url: '/', icon: 'fa-home' },
    { name: 'Alumni Portal', url: '/portal', icon: 'fa-door-open' },
    { name: 'About Us', url: '#about', icon: 'fa-info-circle' },
    { name: 'Events', url: '#events', icon: 'fa-calendar-days' },
    { name: 'News & Updates', url: '#news', icon: 'fa-newspaper' },
    { name: 'Career Opportunities', url: '#careers', icon: 'fa-briefcase' },
  ];

  contactInfo = [
    {
      label: 'Email',
      value: 'alumni@diu.edu.bd',
      link: 'mailto:alumni@diu.edu.bd',
      icon: 'fa-envelope',
    },
    {
      label: 'Phone',
      value: '+880-2-9138234',
      link: 'tel:+880291338234',
      icon: 'fa-phone',
    },
    {
      label: 'Address',
      value: 'House # 4, Road # 1, Block-F, Banasree, Dhaka-1219',
      link: '',
      icon: 'fa-location-dot',
    },
  ];

  socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/diu.ac.bd',
      icon: 'fa-facebook-f',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/school/dhaka-international-university/',
      icon: 'fa-linkedin-in',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/diu_bangladesh',
      icon: 'fa-twitter',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@DhakaInternationalUniversity',
      icon: 'fa-youtube',
    },
  ];
}
