import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClienteService } from '@services/cliente.service';
import { ServicioService } from '@services/servicio.service';
import { CitaService } from '@services/cita.service';
import { NotificationService } from '@services/notification.service';
import {
  Servicio,
  ServiciosPorCategoria,
  CrearCitaRequest,
  CategoriaServicio,
} from '@interfaces/cita.interface';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css'],
})
export class CrearCitaComponent implements OnInit, OnDestroy {
  citaForm: FormGroup;
  servicios: ServiciosPorCategoria = {};
  serviciosSeleccionados: Servicio[] = [];
  isLoading = false;
  isLoadingServicios = true;
  celular: number | null = null;
  horariosDisponibles: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService,
    private servicioService: ServicioService,
    private citaService: CitaService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {
    this.citaForm = this.fb.group({
      fecha: ['', [Validators.required, this.validarFechaFutura]],
      hora: ['', Validators.required],
      servicios: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    // Verificar si hay celular registrado
    this.clienteService.celular$
      .pipe(takeUntil(this.destroy$))
      .subscribe((celular) => {
        this.celular = celular;
        this.cdr.detectChanges();
        if (!celular) {
          this.router.navigate(['/cliente']);
        }
      });

    // Cargar servicios disponibles
    this.cargarServicios();

    // Generar horarios disponibles
    this.horariosDisponibles = this.citaService.generarHorarios();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarServicios(): void {
    this.isLoadingServicios = true;
    this.cdr.detectChanges();
    this.servicioService.obtenerServicios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (servicios) => {
          this.servicios = servicios;
          this.isLoadingServicios = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al cargar servicios:', error);
          this.notificationService.error('Error al cargar servicios');
          this.isLoadingServicios = false;
          this.cdr.detectChanges();
        },
      });
  }

  onServicioSelect(servicio: Servicio): void {
    const index = this.serviciosSeleccionados.findIndex(
      (s) => s._id === servicio._id
    );
    if (index === -1) {
      this.serviciosSeleccionados.push(servicio);
    } else {
      this.serviciosSeleccionados.splice(index, 1);
    }
    this.citaForm.patchValue({
      servicios: this.serviciosSeleccionados.map((s) => s._id),
    });
    this.cdr.detectChanges();
  }

  isServicioSelected(servicio: Servicio): boolean {
    return this.serviciosSeleccionados.some((s) => s._id === servicio._id);
  }

  onSubmit(): void {
    if (
      this.citaForm.valid &&
      this.celular &&
      this.serviciosSeleccionados.length > 0
    ) {
      this.isLoading = true;
      this.cdr.detectChanges();

      const citaData: CrearCitaRequest = {
        celular: this.celular,
        fecha: this.citaForm.value.fecha,
        hora: this.citaForm.value.hora,
        servicio: this.serviciosSeleccionados.map((s) => s._id),
        estado: 'Pendiente',
      };

      this.citaService.crearCita(citaData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.notificationService.success('Cita creada exitosamente');
            this.router.navigate(['/cliente/mis-citas']);
          },
          error: (error) => {
            console.error('Error al crear cita:', error);
            this.notificationService.error('Error al crear la cita');
            this.isLoading = false;
            this.cdr.detectChanges();
          },
        });
    } else {
      this.markFormGroupTouched();
      this.cdr.detectChanges();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.citaForm.controls).forEach((key) => {
      this.citaForm.get(key)?.markAsTouched();
    });
  }

  private validarFechaFutura(control: any) {
    if (!control.value) return null;

    const fechaSeleccionada = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return fechaSeleccionada >= hoy ? null : { fechaPasada: true };
  }

  get totalPrecio(): number {
    return this.servicioService.calcularPrecioTotal(
      this.serviciosSeleccionados
    );
  }

  get duracionTotal(): number {
    return this.servicioService.calcularDuracionTotal(
      this.serviciosSeleccionados
    );
  }

  getServicios(categoria: CategoriaServicio): Servicio[] {
    if (!this.servicios[categoria]) {
      return [];
    }
    return this.servicios[categoria]
      .map(servicio => ({ ...servicio, categoria }))
      .sort((a, b) => a.precio - b.precio);
  }

  formatearPrecio(precio: number): string {
    return this.servicioService.formatearPrecio(precio);
  }

  formatearDuracion(duracion: number): string {
    return this.servicioService.formatearDuracion(duracion);
  }

  getCategoriasKeys(): CategoriaServicio[] {
    return Object.keys(this.servicios).sort((a, b) =>
      a.localeCompare(b)
    ) as CategoriaServicio[];
  }

  get fecha() {
    return this.citaForm.get('fecha');
  }

  get hora() {
    return this.citaForm.get('hora');
  }

  getFechaError(): string {
    const control = this.fecha;
    if (control?.hasError('required')) {
      return 'La fecha es requerida';
    }
    if (control?.hasError('fechaPasada')) {
      return 'La fecha debe ser futura';
    }
    return '';
  }

  getHoraError(): string {
    const control = this.hora;
    if (control?.hasError('required')) {
      return 'La hora es requerida';
    }
    return '';
  }

  volver(): void {
    this.router.navigate(['/cliente']);
  }

  getMinDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
