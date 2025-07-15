import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cita, EstadoCita } from '../../../interfaces/cita.interface';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-cita-card',
  templateUrl: './cita-card.component.html',
  styleUrls: ['./cita-card.component.css']
})
export class CitaCardComponent {
  @Input() cita!: Cita;
  @Input() showActions = true;
  @Input() isAdmin = false;
  @Output() editCita = new EventEmitter<Cita>();
  @Output() cancelCita = new EventEmitter<Cita>();
  @Output() updateStatus = new EventEmitter<{ cita: Cita, estado: EstadoCita }>();

  constructor(private citaService: CitaService) {}

  onEdit(): void {
    this.editCita.emit(this.cita);
  }

  onCancel(): void {
    this.cancelCita.emit(this.cita);
  }

  onUpdateStatus(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      const estado = target.value as EstadoCita;
      this.updateStatus.emit({ cita: this.cita, estado });
    }
  }

  getEstadoColor(): string {
    return this.citaService.getColorEstado(this.cita.estado);
  }

  formatearFecha(fecha: string): string {
    return this.citaService.formatearFecha(fecha);
  }

  getServicioNombres(): string {
    if (Array.isArray(this.cita.servicio)) {
      return this.cita.servicio.map(s => typeof s === 'string' ? s : s.nombre).join(', ');
    }
    return '';
  }

  canCancel(): boolean {
    return ['Pendiente', 'Aprobada', 'Notificada'].includes(this.cita.estado);
  }

  canEdit(): boolean {
    return ['Pendiente'].includes(this.cita.estado);
  }

  getEstadosDisponibles(): EstadoCita[] {
    return this.citaService.getEstadosDisponibles();
  }
}