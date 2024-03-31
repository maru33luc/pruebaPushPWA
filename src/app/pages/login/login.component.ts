import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginPageComponent {

}
