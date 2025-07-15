import { faArrowUp, faBars } from '@fortawesome/free-solid-svg-icons';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isScrollActive: boolean = false;
  faBars = faBars;
  faArrowUp = faArrowUp;
  
  // Nuevas propiedades para el sistema de cliente
  isAuthenticated = false;
  user: Usuario | null = null;
  hasCelular = false;
  celular: number | null = null;
  
  // Propiedad para detectar si estamos en la landing
  isLandingPage = false;

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.clienteService.celular$.subscribe(celular => {
      this.hasCelular = celular !== null;
      this.celular = celular;
    });
    
    // Detectar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const navEndEvent = event as NavigationEnd;
      this.isLandingPage = navEndEvent.url === '/' || navEndEvent.url === '';
    });
    
    // Detectar ruta inicial
    this.isLandingPage = this.router.url === '/' || this.router.url === '';
  }

  // Abre o cierra el menú
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Cierra el menú
  closeMenu(): void {
    this.isMenuOpen = false;
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

  // Navegación para el sistema de cliente
  navigateHome(): void {
    this.router.navigate(['/']);
    this.closeMenu();
  }

  navigateToCliente(): void {
    this.router.navigate(['/cliente']);
    this.closeMenu();
  }

  navigateToMisCitas(): void {
    this.router.navigate(['/cliente/mis-citas']);
    this.closeMenu();
  }

  navigateToAdmin(): void {
    this.router.navigate(['/salon']);
    this.closeMenu();
  }

  clearCelular(): void {
    this.clienteService.clearCelular();
    this.closeMenu();
  }
}
