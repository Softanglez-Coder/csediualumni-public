import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import {
  CommitteeService,
  Committee,
  CommitteeMemberWithDesignation,
} from '../../services/committee.service';

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
  imports: [RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly committeeService = inject(CommitteeService);
  private readonly destroyRef = inject(DestroyRef);

  readonly currentCommittee = signal<Committee | null>(null);
  readonly committeeMembers = signal<CommitteeMemberWithDesignation[]>([]);
  readonly loadingCommittee = signal(false);

  readonly features: Feature[] = [
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

  readonly milestones: Milestone[] = [
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

  ngOnInit(): void {
    this.loadCurrentCommittee();
  }

  loadCurrentCommittee(): void {
    this.loadingCommittee.set(true);
    this.committeeService
      .getCurrentCommittee()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (committee) => {
          this.currentCommittee.set(committee);
          if (committee) {
            this.committeeMembers.set(this.committeeService.getMembersWithDesignations(committee));
          }
          this.loadingCommittee.set(false);
        },
        error: (error) => {
          console.error('Error loading committee:', error);
          this.loadingCommittee.set(false);
        },
      });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
