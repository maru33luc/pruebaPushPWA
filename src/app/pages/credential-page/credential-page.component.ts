import { Component } from '@angular/core';
import { CredentialComponent } from '../../components/credential/credential.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-credential-page',
  standalone: true,
  imports: [CredentialComponent, HeroComponent],
  templateUrl: './credential-page.component.html',
  styleUrl: './credential-page.component.css'
})
export class CredentialPageComponent {

}
