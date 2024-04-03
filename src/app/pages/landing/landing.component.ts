import { Subscription, of } from 'rxjs';
import { NewsSliderComponent } from '../../components/news-slider/news-slider.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoginComponent } from '../../components/login/login.component';
import { EventsComponent } from '../../components/events/events.component';
import { GovServicesComponent } from '../../components/gov-services/gov-services.component';
import { AuthService } from '../../services/auth.service';
import { BrowserPlatformLocation, PlatformLocation } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, NewsSliderComponent,
    FooterComponent, EventsComponent, GovServicesComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  isUserAuthenticated?: boolean;
  userName?: string;
  loginSubscription: Subscription | undefined;
  alreadySubscribed?: boolean ;;

  constructor(private loginService: AuthService, private platformLocation: PlatformLocation, private router: Router) { }

  ngOnInit(): void {
    if (!this.alreadySubscribed || this.isUserAuthenticated === undefined) {
      this.loginSubscription = this.loginService.login?.subscribe({
        next: (loggedIn) => {
          this.isUserAuthenticated = loggedIn;
          if (loggedIn) {
            this.userName = this.loginService.currentUser()?.username;
          } 
        },
        complete: () => console.log('Observable completado')
      });
      this.alreadySubscribed = true;
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
      this.loginService.login = of(false);
    }
  }
 
}
