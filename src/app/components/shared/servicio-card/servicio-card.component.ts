import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Servicio } from '@interfaces/cita.interface';
import { ServicioService } from '@services/servicio.service';

@Component({
  selector: 'app-servicio-card',
  templateUrl: './servicio-card.component.html',
  styleUrls: ['./servicio-card.component.css'],
})
export class ServicioCardComponent {
  @Input() servicio!: Servicio;
  @Input() isSelected = false;
  @Input() isAdmin = false;
  @Output() selectServicio = new EventEmitter<Servicio>();
  @Output() editServicio = new EventEmitter<Servicio>();
  @Output() deleteServicio = new EventEmitter<Servicio>();

  constructor(private servicioService: ServicioService) {}

  onSelect(): void {
    this.selectServicio.emit(this.servicio);
  }

  onEdit(): void {
    this.editServicio.emit(this.servicio);
  }

  onDelete(): void {
    this.deleteServicio.emit(this.servicio);
  }

  formatearPrecio(): string {
    return this.servicioService.formatearPrecio(this.servicio.precio);
  }

  formatearDuracion(): string {
    return this.servicioService.formatearDuracion(this.servicio.duracion);
  }

  getColorCategoria(): string {
    if (!this.servicio.categoria)
      console.log(
        '🚀 ~ ServicioCardComponent ~ getColorCategoria ~ this.servicio:',
        this.servicio
      );
    return this.servicioService.getColorCategoria(this.servicio.categoria);
  }
}
