import { isPlatformBrowser } from '@angular/common';
import { Component } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import { PLATFORM_ID, Inject } from '@angular/core';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollTrigger();
    }
  }

  initScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    window.addEventListener('load', () => {
      const details = gsap.utils.toArray<HTMLElement>(".desktopContentSection:not(:first-child)");
      const photos = gsap.utils.toArray<HTMLElement>(".desktopPhoto:not(:first-child)");

      gsap.set(photos, { yPercent: 101 });

      const allPhotos = gsap.utils.toArray<HTMLElement>(".desktopPhoto");

      let mm = gsap.matchMedia();

      mm.add("(min-width: 600px)", () => {
        console.log("desktop");

        ScrollTrigger.create({
          trigger: ".gallery",
          start: "top top",
          end: "bottom bottom",
          pin: ".right"
        });

        details.forEach((detail, index) => {
          let headline = detail.querySelector("h1");
          let animation = gsap.timeline()
            .to(photos[index], { yPercent: 0 })
            .set(allPhotos[index], { autoAlpha: 0 });
          ScrollTrigger.create({
            trigger: headline,
            start: "top 80%",
            end: "top 50%",
            animation: animation,
            scrub: true,
            markers: false
          });
        });

        return () => {
          console.log("mobile");
        };
      });
    });
  }
}
