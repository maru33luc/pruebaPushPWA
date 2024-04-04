import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginPageComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(l => l.LoginPageComponent) },
  { path: 'register', loadComponent: () => import('./pages/register-page/register-page.component').then(r => r.RegisterPageComponent) },
  { path: 'credential', loadComponent: () => import('./pages/credential-page/credential-page.component').then(c => c.CredentialPageComponent)},
  { path: '**', redirectTo: '', pathMatch: 'full' }

];
