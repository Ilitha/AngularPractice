import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FamilyMemberService } from '../../core/services/family-member.service';
import { ClanService } from '../../core/services/clan.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly familyMemberService = inject(FamilyMemberService);
  private readonly clanService = inject(ClanService);

  readonly memberCount = this.familyMemberService.members;
  readonly clanCount = this.clanService.clans;
}
