export interface Cita {
  _id?: string;
  celular: number;
  fecha: string;
  hora: string;
  servicio: string[] | Servicio[];
  estado: EstadoCita;
  historial?: HistorialCita[];
  createdAt?: string;
  updatedAt?: string;
}

export interface HistorialCita {
  estado: EstadoCita;
  fecha: string;
}

export interface CrearCitaRequest {
  celular: number;
  fecha: string;
  hora: string;
  servicio: string[];
  estado?: EstadoCita;
}

export interface ActualizarCitaRequest {
  estado: EstadoCita;
  celular: number;
}

export type EstadoCita = 
  | 'Pendiente'
  | 'Aprobada'
  | 'Notificada'
  | 'En progreso'
  | 'Completada'
  | 'Cancelada por clienta'
  | 'Cancelada por salón'
  | 'No asistió';

export interface Servicio {
  _id: string;
  categoria: CategoriaServicio;
  nombre: string;
  precio: number;
  duracion: number;
  createdAt?: string;
  updatedAt?: string;
}

export type CategoriaServicio = 'Tradicional' | 'Acrilico' | 'Semipermanente';

export interface ServiciosPorCategoria {
  [key: string]: Servicio[];
}
