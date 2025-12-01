import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
  {
    path: 'portal',
    loadComponent: () => import('./pages/portal/portal.component').then((m) => m.PortalComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/' },
];
