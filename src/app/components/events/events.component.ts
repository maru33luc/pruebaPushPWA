import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.initScrollTrigger();
      });
    }
  }

  initScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    const details = gsap.utils.toArray<HTMLElement>('.desktopContentSection:not(:first-child)');
    const photos = gsap.utils.toArray<HTMLElement>('.desktopPhoto:not(:first-child)');
    const allPhotos = gsap.utils.toArray<HTMLElement>('.desktopPhoto');

    gsap.set(photos, { yPercent: 100 });

    ScrollTrigger.create({
      trigger: '.gallery',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.right'
    });

    details.forEach((detail, index) => {
      let headline = detail.querySelector('h1');
      let animation = gsap.timeline()
        .to(photos[index], { yPercent: 0, duration: 1.5,ease: 'power2.inOut'})
        .set(allPhotos[index], { autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: headline,
        start: 'top 60%',
        end: 'top 50%',
        animation: animation,
        scrub: true,
        markers: false
      })
    });
  }
}
