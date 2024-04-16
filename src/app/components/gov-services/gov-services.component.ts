import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-gov-services',
  standalone: true,
  imports: [],
  templateUrl: './gov-services.component.html',
  styleUrl: './gov-services.component.css'
})
export class GovServicesComponent implements OnInit{

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone, private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.cargarScript();
        }, 3000);      });
    }
  }

  cargarScript() {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/script.js';
    this.renderer.appendChild(document.body, script);
}
}
