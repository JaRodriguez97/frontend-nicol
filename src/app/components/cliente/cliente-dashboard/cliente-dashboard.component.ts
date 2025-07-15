import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../interfaces/cita.interface';

@Component({
  selector: 'app-cliente-dashboard',
  templateUrl: './cliente-dashboard.component.html',
  styleUrls: ['./cliente-dashboard.component.css']
})
export class ClienteDashboardComponent implements OnInit {
  hasCelular = false;
  celular: number | null = null;
  citas: Cita[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private citaService: CitaService
  ) {}

  ngOnInit(): void {
    this.clienteService.celular$.subscribe(celular => {
      this.hasCelular = celular !== null;
      this.celular = celular;
      
      if (this.hasCelular && celular) {
        this.cargarCitas(celular);
      } else {
        this.isLoading = false;
      }
    });
  }

  private cargarCitas(celular: number): void {
    this.isLoading = true;
    this.citaService.obtenerCitasPorCelular(celular).subscribe({
      next: (citas) => {
        this.citas = citas;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
        this.isLoading = false;
      }
    });
  }

  navegarACrearCita(): void {
    this.router.navigate(['/cliente/crear-cita']);
  }

  navegarAMisCitas(): void {
    this.router.navigate(['/cliente/mis-citas']);
  }

  ingresarCelular(): void {
    // Redirigir al componente de input de celular
    this.router.navigate(['/cliente']);
  }

  cambiarCelular(): void {
    this.clienteService.clearCelular();
    this.router.navigate(['/cliente']);
  }

  get citasProximas(): Cita[] {
    return this.citas
      .filter(cita => ['Pendiente', 'Aprobada', 'Notificada'].includes(cita.estado))
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .slice(0, 3);
  }

  formatearCelular(celular: number): string {
    return this.clienteService.formatearCelular(celular);
  }
}
