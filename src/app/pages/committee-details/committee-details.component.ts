import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  CommitteeService,
  Committee,
  CommitteeMemberWithDesignation,
} from '../../services/committee.service';

interface GroupedMembers {
  designation: string;
  members: CommitteeMemberWithDesignation[];
}

@Component({
  selector: 'app-committee-details',
  imports: [RouterModule],
  templateUrl: './committee-details.component.html',
  styleUrl: './committee-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteeDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly committeeService = inject(CommitteeService);
  private readonly destroyRef = inject(DestroyRef);

  readonly committee = signal<Committee | null>(null);
  readonly groupedMembers = signal<GroupedMembers[]>([]);
  readonly loading = signal(false);
  readonly error = signal(false);

  private committeeId = '';

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.committeeId = params['id'];
      if (this.committeeId) {
        this.loadCommitteeDetails();
      }
    });
  }

  loadCommitteeDetails(): void {
    this.loading.set(true);
    this.error.set(false);

    this.committeeService
      .getCommittee(this.committeeId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (committee) => {
          this.committee.set(committee);
          this.groupMembersByDesignation(committee);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading committee details:', err);
          this.error.set(true);
          this.loading.set(false);
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
    this.groupedMembers.set(
      Array.from(grouped.entries()).map(([designation, members]) => ({
        designation,
        members,
      }))
    );
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
