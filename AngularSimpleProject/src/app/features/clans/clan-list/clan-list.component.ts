import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClanService } from '../../../core/services/clan.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-clan-list',
  imports: [RouterLink, PageHeaderComponent],
  templateUrl: 'clan-list.component.html',
  styleUrl: 'clan-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClanListComponent {
  private readonly clanService = inject(ClanService);
  readonly clans = this.clanService.clans;

  deleteClan(id: string): void {
    this.clanService.deleteClan(id);
  }

  trackById(_index: number, clan: { id: string }): string {
    return clan.id;
  }
}
