import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly quickLinks = [
    { name: 'Home', url: '/', icon: 'fa-home' },
    { name: 'Alumni Portal', url: '/portal', icon: 'fa-door-open' },
    { name: 'About Us', url: '#about', icon: 'fa-info-circle' },
    { name: 'Events', url: '#events', icon: 'fa-calendar-days' },
    { name: 'News & Updates', url: '#news', icon: 'fa-newspaper' },
    { name: 'Career Opportunities', url: '#careers', icon: 'fa-briefcase' },
  ];

  readonly contactInfo = [
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

  readonly socialLinks = [
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
