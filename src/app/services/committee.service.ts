import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CommitteeMember {
  _id?: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  designationId: string;
  joinedAt: Date;
}

export interface Designation {
  _id: string;
  name: string;
  roles: string[];
}

export interface Committee {
  _id: string;
  name: string;
  year: number;
  isCurrent: boolean;
  designations: Designation[];
  members: CommitteeMember[];
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommitteeMemberWithDesignation extends CommitteeMember {
  designation: Designation;
}

@Injectable({
  providedIn: 'root',
})
export class CommitteeService {
  private apiUrl = `${environment.apiUrl}/committees`;

  constructor(private http: HttpClient) {}

  getAllCommittees(): Observable<Committee[]> {
    return this.http.get<Committee[]>(this.apiUrl);
  }

  getCurrentCommittee(): Observable<Committee> {
    return this.http.get<Committee>(`${this.apiUrl}/current`);
  }

  getCommittee(id: string): Observable<Committee> {
    return this.http.get<Committee>(`${this.apiUrl}/${id}`);
  }

  // Helper method to get members with their designation details
  getMembersWithDesignations(committee: Committee): CommitteeMemberWithDesignation[] {
    return committee.members.map((member) => {
      const designation = committee.designations.find((d) => d._id === member.designationId);
      return {
        ...member,
        designation: designation!,
      };
    });
  }
}
