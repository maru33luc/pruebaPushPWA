import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { BrowserPlatformLocation, CommonModule, PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _isFixed: boolean = false;
  private _fixedThreshold: number = 0;
  isMenuOpen: boolean = false;
  currentUser?: User | null;
  isUserAuthenticated?: boolean;
  

  @ViewChild('menuIcon') menuIconRef: ElementRef | undefined;
  @ViewChild('navbar') navbarRef: ElementRef | undefined;
  @ViewChild('navBg') navBgRef: ElementRef | undefined;

  constructor(private authService: AuthService, private platformLocation: PlatformLocation) { }


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.menuIconRef && this.navbarRef && this.navBgRef) {
      this.menuIconRef.nativeElement.classList.toggle('bx-x', this.isMenuOpen);
      this.navbarRef.nativeElement.classList.toggle('active', this.isMenuOpen);
      this.navBgRef.nativeElement.classList.toggle('active', this.isMenuOpen);
    }
  }

  ngOnInit(): void {
    if (this.platformLocation instanceof BrowserPlatformLocation) {
      // Código a ejecutar solo en el lado del cliente
      this.currentUser = this.authService.currentUser();
      this.isUserAuthenticated = localStorage.getItem('token') ? true : false;
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  @HostListener('window:scroll', [])
  handleScroll() {
    const header = document.querySelector('.header') as HTMLElement;
    const headerHeight = header.clientHeight;
    const scrollPosition = window.scrollY;
    if (scrollPosition >= headerHeight) {
      header.classList.add('header-fixed');
    } else {
      header.classList.remove('header-fixed');
    }
  }
  

  logout(): void {
    this.authService.logout();
    this.isUserAuthenticated = false;
  }

}
