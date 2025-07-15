import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { CitaService } from '../../../services/cita.service';
import { NotificationService } from '../../../services/notification.service';
import { Cita } from '../../../interfaces/cita.interface';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent implements OnInit {
  citas: Cita[] = [];
  isLoading = true;
  celular: number | null = null;
  filtroActual = 'todas';
  showConfirmDialog = false;
  citaToCancel: Cita | null = null;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private citaService: CitaService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.clienteService.celular$.subscribe(celular => {
      this.celular = celular;
      if (!celular) {
        this.router.navigate(['/cliente']);
      } else {
        this.cargarCitas(celular);
      }
    });
  }

  private cargarCitas(celular: number): void {
    this.isLoading = true;
    this.citaService.obtenerCitasPorCelular(celular).subscribe({
      next: (citas) => {
        this.citas = citas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
        this.notificationService.error('Error al cargar las citas');
        this.isLoading = false;
      }
    });
  }

  get citasFiltradas(): Cita[] {
    switch (this.filtroActual) {
      case 'proximas':
        return this.citas.filter(cita => 
          ['Pendiente', 'Aprobada', 'Notificada'].includes(cita.estado)
        );
      case 'completadas':
        return this.citas.filter(cita => 
          ['Completada'].includes(cita.estado)
        );
      case 'canceladas':
        return this.citas.filter(cita => 
          ['Cancelada por clienta', 'Cancelada por salón', 'No asistió'].includes(cita.estado)
        );
      default:
        return this.citas;
    }
  }

  setFiltro(filtro: string): void {
    this.filtroActual = filtro;
  }

  onEditCita(cita: Cita): void {
    // Implementar edición de cita
    this.notificationService.info('Función de edición próximamente disponible');
  }

  onCancelCita(cita: Cita): void {
    this.citaToCancel = cita;
    this.showConfirmDialog = true;
  }

  confirmCancelCita(): void {
    if (this.citaToCancel && this.celular) {
      this.citaService.eliminarCita(this.citaToCancel._id!, this.celular).subscribe({
        next: () => {
          this.notificationService.success('Cita cancelada exitosamente');
          this.cargarCitas(this.celular!);
          this.closeConfirmDialog();
        },
        error: (error) => {
          console.error('Error al cancelar cita:', error);
          this.notificationService.error('Error al cancelar la cita');
          this.closeConfirmDialog();
        }
      });
    }
  }

  closeConfirmDialog(): void {
    this.showConfirmDialog = false;
    this.citaToCancel = null;
  }

  navegarACrearCita(): void {
    this.router.navigate(['/cliente/crear-cita']);
  }

  volver(): void {
    this.router.navigate(['/cliente']);
  }

  getContadorPorFiltro(filtro: string): number {
    switch (filtro) {
      case 'proximas':
        return this.citas.filter(cita => 
          ['Pendiente', 'Aprobada', 'Notificada'].includes(cita.estado)
        ).length;
      case 'completadas':
        return this.citas.filter(cita => 
          ['Completada'].includes(cita.estado)
        ).length;
      case 'canceladas':
        return this.citas.filter(cita => 
          ['Cancelada por clienta', 'Cancelada por salón', 'No asistió'].includes(cita.estado)
        ).length;
      default:
        return this.citas.length;
    }
  }

  formatearCelular(celular: number): string {
    return this.clienteService.formatearCelular(celular);
  }
}