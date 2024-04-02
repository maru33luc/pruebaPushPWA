import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _isFixed: boolean = false;
  private _fixedThreshold: number = 0; 
  isMenuOpen: boolean = false;

  @ViewChild('menuIcon') menuIconRef: ElementRef | undefined;
  @ViewChild('navbar') navbarRef: ElementRef | undefined;
  @ViewChild('navBg') navBgRef: ElementRef | undefined;

  constructor() {}


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.menuIconRef && this.navbarRef && this.navBgRef) {
      this.menuIconRef.nativeElement.classList.toggle('bx-x', this.isMenuOpen);
      this.navbarRef.nativeElement.classList.toggle('active', this.isMenuOpen);
      this.navBgRef.nativeElement.classList.toggle('active', this.isMenuOpen);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this._isFixed = scrollTop > this._fixedThreshold;
    const navBar = document.querySelector('.header');
    navBar?.classList.toggle('header-fixed', this._isFixed);
  }

  

}
