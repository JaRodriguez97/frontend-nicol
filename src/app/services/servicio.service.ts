import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Servicio, ServiciosPorCategoria, CategoriaServicio } from '../interfaces/cita.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  constructor(private apiService: ApiService) {}

  // Obtener todos los servicios agrupados por categoría
  obtenerServicios(): Observable<ServiciosPorCategoria> {
    return this.apiService.get<ServiciosPorCategoria>('/servicios');
  }

  // Obtener servicios como array plano
  obtenerServiciosPlanos(): Observable<Servicio[]> {
    return this.obtenerServicios().pipe(
      map(serviciosPorCategoria => {
        const servicios: Servicio[] = [];
        Object.values(serviciosPorCategoria).forEach(categoria => {
          servicios.push(...categoria);
        });
        return servicios;
      })
    );
  }

  // Obtener servicio por ID
  obtenerServicio(id: string): Observable<Servicio> {
    return this.apiService.get<Servicio>(`/servicios/${id}`);
  }

  // Crear servicio (solo admin)
  crearServicio(servicio: Partial<Servicio>): Observable<Servicio> {
    return this.apiService.post<Servicio>('/servicios', servicio);
  }

  // Actualizar servicio (solo admin)
  actualizarServicio(id: string, servicio: Partial<Servicio>): Observable<Servicio> {
    return this.apiService.put<Servicio>(`/servicios/${id}`, servicio);
  }

  // Eliminar servicio (solo admin)
  eliminarServicio(id: string): Observable<any> {
    return this.apiService.delete(`/servicios/${id}`);
  }

  // Obtener categorías disponibles
  getCategorias(): CategoriaServicio[] {
    return ['Tradicional', 'Acrilico', 'Semipermanente'];
  }

  // Obtener servicios por categoría
  obtenerServiciosPorCategoria(categoria: CategoriaServicio): Observable<Servicio[]> {
    return this.obtenerServicios().pipe(
      map(serviciosPorCategoria => serviciosPorCategoria[categoria] || [])
    );
  }

  // Formatear precio
  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(precio);
  }

  // Formatear duración
  formatearDuracion(duracion: number): string {
    if (duracion < 60) {
      return `${duracion} min`;
    } else {
      const horas = Math.floor(duracion / 60);
      const minutos = duracion % 60;
      if (minutos === 0) {
        return `${horas} ${horas === 1 ? 'hora' : 'horas'}`;
      } else {
        return `${horas}h ${minutos}min`;
      }
    }
  }

  // Calcular precio total de múltiples servicios
  calcularPrecioTotal(servicios: Servicio[]): number {
    return servicios.reduce((total, servicio) => total + servicio.precio, 0);
  }

  // Calcular duración total de múltiples servicios
  calcularDuracionTotal(servicios: Servicio[]): number {
    return servicios.reduce((total, servicio) => total + servicio.duracion, 0);
  }

  // Buscar servicios por nombre
  buscarServicios(termino: string): Observable<Servicio[]> {
    return this.obtenerServiciosPlanos().pipe(
      map(servicios => 
        servicios.filter(servicio => 
          servicio.nombre.toLowerCase().includes(termino.toLowerCase()) ||
          servicio.categoria.toLowerCase().includes(termino.toLowerCase())
        )
      )
    );
  }

  // Obtener color para categoría
  getColorCategoria(categoria: CategoriaServicio): string {
    const colores: { [key in CategoriaServicio]: string } = {
      'Tradicional': 'bg-green-100 text-green-800',
      'Acrilico': 'bg-purple-100 text-purple-800',
      'Semipermanente': 'bg-blue-100 text-blue-800'
    };
    return colores[categoria] || 'bg-gray-100 text-gray-800';
  }
}
