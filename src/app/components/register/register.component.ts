import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../pages/login/services/auth.service';
import { UserRegister } from '../../pages/login/interfaces/user-register.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName) && this.registerForm.controls[controlName].touched;
  }

  postRegister() {

    const { email, password, username } = this.registerForm.value;

    this.authService.registerUser(email, password, username).subscribe(
      {
        next: (user: UserRegister) => {
          console.log('Registrado...', user)
        },

        error: (err: any) => {
          console.log(err)
        }
      }
    )
  }

}
