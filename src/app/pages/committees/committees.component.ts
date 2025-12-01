import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { CommitteeService, Committee } from '../../services/committee.service';

@Component({
  selector: 'app-committees',
  imports: [RouterModule],
  templateUrl: './committees.component.html',
  styleUrl: './committees.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitteesComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly committeeService = inject(CommitteeService);
  private readonly destroyRef = inject(DestroyRef);

  readonly committees = signal<Committee[]>([]);
  readonly currentCommittee = signal<Committee | null>(null);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.loadCommittees();
  }

  loadCommittees(): void {
    this.loading.set(true);
    this.committeeService
      .getAllCommittees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (committees) => {
          this.committees.set(committees);
          this.currentCommittee.set(committees.find((c) => c.isCurrent) || null);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error loading committees:', error);
          this.loading.set(false);
        },
      });
  }

  viewCommitteeDetails(committeeId: string): void {
    this.router.navigate(['/committees', committeeId]);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
