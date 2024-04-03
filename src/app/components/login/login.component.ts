import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { AuthService } from '../../pages/login/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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
          swal('Logueado con exito!')
          this.router.navigate([''])
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
