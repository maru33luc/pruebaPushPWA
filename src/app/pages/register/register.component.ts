import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RegisterComponent } from '../../components/register/register.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterComponent, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterPageComponent {

}
