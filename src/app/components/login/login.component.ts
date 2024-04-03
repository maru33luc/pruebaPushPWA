import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../pages/login/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.loginForm = this.fb.group({
      email: ['gchaldu@gmail.com', [Validators.required, Validators.email]],
      password: ['Pass2024', [Validators.required, Validators.minLength(3)]]
    })
  }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName) && this.loginForm.controls[controlName].touched;
  }

  login() {
    const { email, password } = this.loginForm.value;

    this.authService.postLogin(email, password).subscribe(
      {
        next: () => {
          this.router.navigateByUrl('/home')
          console.log('Logeado...')
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }


}
