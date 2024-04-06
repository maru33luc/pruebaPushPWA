import { Component, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { SwPush, SwRegistrationOptions } from '@angular/service-worker';
import { NotificationsService } from './services/notifications.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'muni-app-client';
  isOnline?: boolean;
  notificationGranted: boolean = false;
  pushSubscribed: boolean = false;
  readonly VAPID_PUBLIC_KEY = 'BO8rkhvjsmXJy0TOyIdQOI8iy-QzIsFWI0pNwLYsj8OtxS6cawcM7EI5WAK0fgKFf350WdetyjCJbbcTfWXaOYM';

  constructor(private notificationService: NotificationsService,
    private sw: SwRegistrationOptions,
    private swPush: SwPush, @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone){
      if (isPlatformBrowser(this.platformId)) {
      this.notificationGranted = window.Notification.permission === 'granted';
    this.subscribeToNotifications();
      }
  }

  ngOnInit(): void {
    this.isOnline = this.sw.enabled;
    this.swPush.subscription.subscribe((subscription) => {
      console.log(subscription);
    });
    this.swPush.messages.subscribe((message) => {
      console.log(message);
    });
  }

//   subscribeToNotifications():any {
//     this.swPush.requestSubscription({
//       serverPublicKey: this.VAPID_PUBLIC_KEY
//     })
//       .then(sub => {

//         const token = sub.toJSON();
//         console.log('Notification Subscription: ', sub);
       
//         this.notificationService.saveToken(token).subscribe(
//           res => {
//             console.log('Token saved', res);
//           },
//           err => {
//             console.error('Could not save token', err);
//           }
//         );
//   }, err => {
//     console.error('Could not subscribe to notifications', err);
//   });

// }

public async subscribeToNotifications() {
  (await this.notificationService.subscribeToNotifications()).subscribe({
    next: () => {
      this.pushSubscribed = true;
      this.notificationGranted = window.Notification.permission === 'granted';
    }
  });
}
}
