import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginPageComponent {

}
