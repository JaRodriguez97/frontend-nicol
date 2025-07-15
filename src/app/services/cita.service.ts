import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Cita, CrearCitaRequest, ActualizarCitaRequest, EstadoCita } from '../interfaces/cita.interface';
import { CitaResponse } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  constructor(private apiService: ApiService) {}

  // Crear cita (público)
  crearCita(cita: CrearCitaRequest): Observable<CitaResponse> {
    return this.apiService.post<CitaResponse>('/citas', cita);
  }

  // Obtener citas por celular (público)
  obtenerCitasPorCelular(celular: number): Observable<Cita[]> {
    return this.apiService.get<Cita[]>(`/citas/celular/${celular}`);
  }

  // Obtener todas las citas (solo admin)
  obtenerTodasLasCitas(): Observable<Cita[]> {
    return this.apiService.get<Cita[]>('/citas');
  }

  // Obtener mis citas (usuario autenticado)
  obtenerMisCitas(): Observable<Cita[]> {
    return this.apiService.get<Cita[]>('/citas/mis-citas');
  }

  // Actualizar cita (usuario autenticado)
  actualizarCita(id: string, datos: ActualizarCitaRequest): Observable<any> {
    return this.apiService.put(`/citas/${id}`, datos);
  }

  // Eliminar cita (usuario autenticado)
  eliminarCita(id: string, celular: number): Observable<any> {
    return this.apiService.delete(`/citas/${id}`);
  }

  // Obtener estados disponibles
  getEstadosDisponibles(): EstadoCita[] {
    return [
      'Pendiente',
      'Aprobada',
      'Notificada',
      'En progreso',
      'Completada',
      'Cancelada por clienta',
      'Cancelada por salón',
      'No asistió'
    ];
  }

  // Obtener color para estado
  getColorEstado(estado: EstadoCita): string {
    const colores: { [key in EstadoCita]: string } = {
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Aprobada': 'bg-green-100 text-green-800',
      'Notificada': 'bg-blue-100 text-blue-800',
      'En progreso': 'bg-purple-100 text-purple-800',
      'Completada': 'bg-gray-100 text-gray-800',
      'Cancelada por clienta': 'bg-red-100 text-red-800',
      'Cancelada por salón': 'bg-red-100 text-red-800',
      'No asistió': 'bg-orange-100 text-orange-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  }

  // Validar si una fecha es válida (no puede ser en el pasado)
  validarFecha(fecha: string): boolean {
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fechaSeleccionada >= hoy;
  }

  // Validar formato de hora
  validarHora(hora: string): boolean {
    const horaRegex = /^(1[0-2]|[1-9]):[0-5][0-9]\s?(AM|PM)$/i;
    return horaRegex.test(hora);
  }

  // Convertir hora de 24h a 12h con AM/PM
  convertirA12h(hora24: string): string {
    const [horas, minutos] = hora24.split(':');
    const horasNum = parseInt(horas, 10);
    const periodo = horasNum >= 12 ? 'PM' : 'AM';
    const horas12 = horasNum === 0 ? 12 : horasNum > 12 ? horasNum - 12 : horasNum;
    return `${horas12}:${minutos} ${periodo}`;
  }

  // Convertir hora de 12h a 24h
  convertirA24h(hora12: string): string {
    const [tiempo, periodo] = hora12.split(' ');
    const [horas, minutos] = tiempo.split(':');
    let horasNum = parseInt(horas, 10);
    
    if (periodo.toUpperCase() === 'PM' && horasNum !== 12) {
      horasNum += 12;
    } else if (periodo.toUpperCase() === 'AM' && horasNum === 12) {
      horasNum = 0;
    }
    
    return `${horasNum.toString().padStart(2, '0')}:${minutos}`;
  }

  // Formatear fecha para mostrar
  formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Generar horarios disponibles
  generarHorarios(): string[] {
    const horarios: string[] = [];
    
    // Horarios de 8:00 AM a 6:00 PM
    for (let hora = 9; hora <= 18; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const periodo = hora >= 12 ? 'PM' : 'AM';
        const hora12 = hora === 0 ? 12 : hora > 12 ? hora - 12 : hora;
        const minutosStr = minuto === 0 ? '00' : minuto.toString();
        horarios.push(`${hora12}:${minutosStr} ${periodo}`);
      }
    }
    
    return horarios;
  }
}
