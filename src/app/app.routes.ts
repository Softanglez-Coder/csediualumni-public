import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'portal',
    loadComponent: () =>
      import('./features/portal/portal.component').then((m) => m.PortalComponent),
    canActivate: [authGuard],
  },
];
