import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private celularSubject = new BehaviorSubject<number | null>(null);
  public celular$ = this.celularSubject.asObservable();

  constructor() {
    this.loadCelularFromStorage();
  }

  private loadCelularFromStorage(): void {
    const storedCelular = localStorage.getItem('cliente_celular');
    if (storedCelular) {
      try {
        const celular = parseInt(storedCelular, 10);
        if (this.validarCelular(celular)) {
          this.celularSubject.next(celular);
        } else {
          this.clearCelular();
        }
      } catch (error) {
        console.error('Error al cargar celular del localStorage:', error);
        this.clearCelular();
      }
    }
  }

  setCelular(celular: number): boolean {
    if (this.validarCelular(celular)) {
      localStorage.setItem('cliente_celular', celular.toString());
      this.celularSubject.next(celular);
      return true;
    }
    return false;
  }

  getCelular(): number | null {
    return this.celularSubject.value;
  }

  clearCelular(): void {
    localStorage.removeItem('cliente_celular');
    this.celularSubject.next(null);
  }

  hasCelular(): boolean {
    return this.celularSubject.value !== null;
  }

  validarCelular(celular: number): boolean {
    if (!celular) return false;
    
    const celularStr = celular.toString();
    
    // Debe tener exactamente 10 dígitos
    if (celularStr.length !== 10) return false;
    
    // Debe comenzar con 3
    if (!celularStr.startsWith('3')) return false;
    
    // Debe ser un número válido
    if (isNaN(celular)) return false;
    
    return true;
  }

  formatearCelular(celular: number): string {
    const celularStr = celular.toString();
    return `${celularStr.substring(0, 3)} ${celularStr.substring(3, 6)} ${celularStr.substring(6, 10)}`;
  }
}
