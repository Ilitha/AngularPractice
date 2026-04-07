import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FamilyMemberService } from '../../../core/services/family-member.service';
import { ClanService } from '../../../core/services/clan.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-family-member-list',
  imports: [RouterLink, PageHeaderComponent],
  templateUrl: 'family-member-list.component.html',
  styleUrl: 'family-member-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamilyMemberListComponent {
  private readonly familyMemberService = inject(FamilyMemberService);
  private readonly clanService = inject(ClanService);

  readonly members = this.familyMemberService.members;

  getClanName(clanId: string): string {
    return this.clanService.getClanById(clanId)?.name ?? 'Unknown Clan';
  }

  deleteMember(id: string): void {
    this.familyMemberService.deleteMember(id);
  }

  trackById(_index: number, member: { id: string }): string {
    return member.id;
  }
}
