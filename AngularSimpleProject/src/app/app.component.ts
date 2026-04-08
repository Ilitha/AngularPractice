import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="app-header">
      <div class="header-content">
        <a routerLink="/" class="brand" aria-label="Heritage App Home">
          <span class="brand-icon" aria-hidden="true">🌳</span>
          <span class="brand-name">Heritage</span>
        </a>
        <nav aria-label="Main navigation">
          <ul class="nav-list" role="list">
            <li>
              <a
                routerLink="/"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                aria-label="Home"
              >Home</a>
            </li>
            <li>
              <a
                routerLink="/family-members"
                routerLinkActive="active"
                aria-label="Family Members"
              >Family Members</a>
            </li>
            <li>
              <a
                routerLink="/clans"
                routerLinkActive="active"
                aria-label="Clans"
              >Clans</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main id="main-content" class="main-content" tabindex="-1">
      <router-outlet />
    </main>
    <footer class="app-footer">
      <p>Heritage App &copy; {{ currentYear }} — Preserving Family History</p>
    </footer>
  `,
  styleUrl: 'app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly currentYear = new Date().getFullYear();
}
