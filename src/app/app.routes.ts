import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';


export const routes: Routes = [

   { path: '', component: LandingComponent },
   { path: 'login', loadComponent: () => import('./pages/login/login.component').then(l => l.LoginPageComponent) },
   { path: 'register', loadComponent: () => import('./pages/register/register.component').then(r => r.RegisterPageComponent) },
   { path: '**', redirectTo: '', pathMatch: 'full' }
];
