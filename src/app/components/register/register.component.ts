import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { AuthService } from '../../pages/login/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm: FormGroup

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    })
  }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName) && this.loginForm.controls[controlName].touched;
  }
  send() {
    console.log(this.loginForm.value);
    swal("Hello world!");
    const validPass = this.validatePassword();
    // if (validPass) {
    //   this.loginService.register(this.loginForm.value.username, this.loginForm.value.email, this.loginForm.value.password)
    // } else {
    //   swal("Las contraseñas no coinciden");
    // }
  }

  validatePassword() {  
    const password = this.loginForm.get('password')?.value; // Add null check
    const repassword = this.loginForm.get('repassword')?.value; // Add null check
    return password === repassword ? true : false
  }

// async register () {
//     if (this.loginForm.invalid) {
//         this.loginForm.markAllAsTouched();
//     } else {
//         const validPass = this.validatePassword();
//         if (validPass) {
//           try {
//             const res = await this.loginService.register(
//               this.loginForm.value.username,
//               this.loginForm.value.email,
//               this.loginForm.value.password
//             );
//             if (res !== undefined && res !== null) {
//               this.router.navigate(['']);
//             }
//           } catch (e) {
//             console.log(e);
//             swal("No se pudo registrar");
//           }
//         } else {
//             swal("Las contraseñas no coinciden");
//         }
//     }
//   }
}
