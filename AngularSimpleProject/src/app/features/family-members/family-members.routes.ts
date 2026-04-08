import { Routes } from '@angular/router';

export const FAMILY_MEMBERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./family-member-list/family-member-list.component').then(
        m => m.FamilyMemberListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./family-member-form/family-member-form.component').then(
        m => m.FamilyMemberFormComponent
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./family-member-form/family-member-form.component').then(
        m => m.FamilyMemberFormComponent
      ),
  },
];
