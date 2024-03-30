import { Routes } from '@angular/router';
import path from 'path';
import { LandingComponent } from './pages/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login/login.component';

export const routes: Routes = [
   { path: '', component: LandingComponent},
   
   {path: 'login', component: LoginPageComponent},




];
