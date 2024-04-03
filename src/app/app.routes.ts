import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterPageComponent } from './pages/register/register.component';

export const routes: Routes = [
   { path: '', component: LandingComponent},
   { path: 'login', component: LoginPageComponent},
   {path: 'register', component: RegisterPageComponent },
];
