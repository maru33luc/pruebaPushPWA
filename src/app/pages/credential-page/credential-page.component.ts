import { Component, HostListener } from '@angular/core';
import { CredentialComponent } from '../../components/credential/credential.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-credential-page',
  standalone: true,
  imports: [CredentialComponent, HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './credential-page.component.html',
  styleUrl: './credential-page.component.css'
})
export class CredentialPageComponent {
  isSmallScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth < 768;
  }
}
