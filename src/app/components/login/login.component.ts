import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, PlatformLocation } from '@angular/common';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService, private loginService: AuthService, private platformLocation: PlatformLocation) {
    this.loginForm = this.fb.group({
      email: ['gchaldu@gmail.com', [Validators.required, Validators.email]],
      password: ['Pass2024', Validators.required],
    })
  }


  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName) && this.loginForm.controls[controlName].touched;
  }
  send() {
    console.log(this.loginForm.value);
    this.login()
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.postLogin(email, password).subscribe(
      {
        next: () => {
          console.log('Logeado...')
          this.router.navigate(['/credential'])
        },
        error: (err) => {
          console.log(err)
          swal('Error al loguearse')
        }
      }
    )
  }

  logout() {
    this.authService.logout()
  }


}
