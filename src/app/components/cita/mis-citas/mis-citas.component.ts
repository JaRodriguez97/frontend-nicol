import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from '@services/Citas/citas.service';
import { NotificationService } from '@services/notification/notification.service';
import { PublicService } from '@services/Public/public.service';

@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css'],
})
export class MisCitasComponent implements OnInit {
  celular: string = '';
  citas: any[] = [];
  cargando: boolean = false;
  formulario: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citasService: CitasService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    public publicService: PublicService
  ) {
    this.formulario = this.fb.group({
      celular: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[3]{1}[0-9]{9}$/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  ngOnInit(): void {
    // Intentar obtener el celular de la URL
    this.route.params.subscribe((params) => {
      if (params['celular']) {
        this.celular = params['celular'];
        this.formulario.patchValue({ celular: this.celular });
        this.buscarCitas();
      } else {
        // Si no está en la URL, intentar obtenerlo del localStorage
        const ultimoCelular = localStorage.getItem('ultimoCelular');
        if (ultimoCelular) {
          this.celular = ultimoCelular;
          this.formulario.patchValue({ celular: this.celular });
          this.buscarCitas();
        }
      }
    });
  }

  buscarCitas(): void {
    if (this.formulario.valid) {
      this.celular = this.formulario.value.celular;
      this.cargando = true;

      this.citasService.obtenerCitasPorCelular(Number(this.celular)).subscribe({
        next: (res) => {
          this.citas = res;
          if (this.citas.length === 0) {
            this.notificationService.info(
              'No se encontraron citas para este número de celular.'
            );
          } else {
            this.notificationService.success(
              `Se encontraron ${this.citas.length} citas.`
            );
            // Guardar el celular para futuras consultas
            localStorage.setItem('ultimoCelular', this.celular);
          }
        },
        error: (err) => {
          console.error('Error al buscar citas:', err);
          this.notificationService.error(
            err.error?.mensaje ||
              'Error al buscar las citas. Por favor, intenta nuevamente.'
          );
        },
        complete: () => {
          this.cargando = false;
        },
      });
    } else {
      this.notificationService.warning(
        'Por favor, ingresa un número de celular válido.'
      );
    }
  }

  nuevaCita(): void {
    this.router.navigate(['/citas']);
  }

  formatDate(fecha: string): string {
    if (!fecha) return '';

    const partes = fecha.split('/');
    if (partes.length !== 3) return fecha;

    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const mes = parseInt(partes[0]) - 1;
    const dia = parseInt(partes[1]);
    const anio = parseInt(partes[2]);

    return `${dia} de ${meses[mes]} de ${anio}`;
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Pendiente':
        return 'estado-pendiente';
      case 'Aprobada':
        return 'estado-aprobada';
      case 'Notificada':
        return 'estado-notificada';
      case 'En progreso':
        return 'estado-en-progreso';
      case 'Completada':
        return 'estado-completada';
      case 'No asistió':
        return 'estado-no-asistio';
      default:
        if (estado.includes('Cancelada')) {
          return 'estado-cancelada';
        }
        return '';
    }
  }
}
