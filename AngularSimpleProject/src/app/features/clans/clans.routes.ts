import { Routes } from '@angular/router';

export const CLANS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./clan-list/clan-list.component').then(m => m.ClanListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./clan-form/clan-form.component').then(m => m.ClanFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./clan-form/clan-form.component').then(m => m.ClanFormComponent),
  },
];
