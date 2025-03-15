import { faArrowUp, faBars } from '@fortawesome/free-solid-svg-icons';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  isScrollActive: boolean = false;
  faBars = faBars;
  faArrowUp = faArrowUp;

  // Abre o cierra el menú
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Detecta el scroll
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrollActive = window.scrollY > 500;
  }

  // Función para volver arriba
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
