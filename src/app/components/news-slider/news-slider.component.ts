import { Component } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpacerTitleComponent } from '../spacer-title/spacer-title.component';
import { News } from '../../interfaces/news.interface';
import { NewsServiceService } from '../../services/news-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-slider',
  standalone: true,
  imports: [SpacerTitleComponent, CommonModule],
  templateUrl: './news-slider.component.html',
  styleUrl: './news-slider.component.css'
})
export class NewsSliderComponent  {
  
  title: string = "Últimas noticias";
  marginTop: number = 0;
  paddingTop: number = 100;
  news : News[] = [];

  constructor(private newsService: NewsServiceService) {  }

  ngOnInit(): void {
    this.newsService.getNews().subscribe(
      (success) => {
        this.news = this.newsService.news();
      },
      (error) => {
        console.error('Error al obtener las noticias:', error);
      }
    );
  }

  getNews(): void {
    this.news = this.newsService.news();
  }

  ngAfterViewInit(): void {
    this.initGsap();
  }

  initGsap(): void {
    if (typeof document !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const container = document.querySelector(".container");
      const sections = gsap.utils.toArray(".container section");
      const texts = gsap.utils.toArray(".anim");
      const mask = document.querySelector(".mask");

      let scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".container",
          pin: true,
          scrub: 1,
          end: "+=3000",
          markers: false,
        }
      });

      console.log(1 / (sections.length - 1));

      gsap.to(mask, {
        width: "100%",
        scrollTrigger: {
          trigger: ".wrapper",
          start: "top left",
          scrub: 1
        }
      });

      sections.forEach((section) => {
        let text = (section as HTMLElement).querySelectorAll(".anim");
        
        if (text.length === 0) return;

        gsap.from(text, {
          y: -130,
          opacity: 0,
          duration: 2,
          ease: "elastic",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section as HTMLElement,
            containerAnimation: scrollTween,
            start: "left center",
            markers: false
          }
        });
      });
    }
  }
}
