import { NewsSliderComponent } from '../../components/news-slider/news-slider.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, NewsSliderComponent,
    FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
