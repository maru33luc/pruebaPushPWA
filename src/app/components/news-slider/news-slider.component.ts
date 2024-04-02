import { Component } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpacerTitleComponent } from '../spacer-title/spacer-title.component';

@Component({
  selector: 'app-news-slider',
  standalone: true,
  imports: [SpacerTitleComponent],
  templateUrl: './news-slider.component.html',
  styleUrl: './news-slider.component.css'
})
export class NewsSliderComponent {
  
  title: string = "Últimas noticias";
  marginTop: number = 0;
  paddingTop: number = 100;

  ngOnInit(): void {
    // Registra ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Selecciona los elementos necesarios
    const container = document.querySelector(".container");
    const sections = gsap.utils.toArray(".container section");
    const texts = gsap.utils.toArray(".anim");
    const mask = document.querySelector(".mask");

    // Animación de desplazamiento
    let scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        pin: true,
        scrub: 1,
        end: "+=3000",
        //snap: 1 / (sections.length - 1),
        markers: false,
      }
    });

    console.log(1 / (sections.length - 1));

    // Animación de la barra de progreso
    gsap.to(mask, {
      width: "100%",
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top left",
        scrub: 1
      }
    });

    // Animación de las secciones
    sections.forEach((section) => {
      // selecciona los elementos de texto dentro de la sección
      let text = (section as HTMLElement).querySelectorAll(".anim");
      
      // Salta si no hay elementos para animar
      if (text.length === 0) return;

      // Animación con efecto de rebote
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
