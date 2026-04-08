import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'family-members',
    loadChildren: () =>
      import('./features/family-members/family-members.routes').then(m => m.FAMILY_MEMBERS_ROUTES),
  },
  {
    path: 'clans',
    loadChildren: () =>
      import('./features/clans/clans.routes').then(m => m.CLANS_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
