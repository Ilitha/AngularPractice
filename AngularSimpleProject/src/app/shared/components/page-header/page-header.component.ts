import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <div class="page-header">
      <h1>{{ title() }}</h1>
      @if (subtitle()) {
        <p class="subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
      h1 {
        margin: 0 0 0.25rem;
        font-size: 2rem;
        font-weight: 700;
        color: #1a3a2e;
      }
      .subtitle {
        margin: 0;
        color: #555;
        font-size: 1rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
}
