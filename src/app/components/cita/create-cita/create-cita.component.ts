import { ServiciosApiService } from './../../../services/ServiciosApi/servicios-api.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from '@services/Citas/citas.service';
import { PublicService } from '@services/Public/public.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@services/notification/notification.service';

@Component({
  selector: 'app-create-cita',
  templateUrl: './create-cita.component.html',
  styleUrls: ['./create-cita.component.css'],
})
export class CreateCitaComponent {
  cancelarCita() {
    throw new Error('Method not implemented.');
  }
  formulario!: FormGroup;
  categorias!: Array<string>;
  serviciosDisponibles: any[] = [];
  serviciosDisponibles2: any[] = [];
  infoServicio = '';
  todosLosServicios!: {
    [key: string]: Array<{
      nombre: string;
      precio: number;
      duracion: number;
      _id: string;
    }>;
  };
  segundoServicio = false;

  token!: string;
  fechaISO!: string;
  hora24!: string;
  totalPrecio = 0;
  totalDuracion = 0;
  servicioSelected!: {
    nombre: string;
    precio: number;
    duracion: number;
    _id: string;
  };
  servicioSelected2!: {
    nombre: string;
    precio: number;
    duracion: number;
    _id: string;
  };

  constructor(
    public publicService: PublicService,
    public router: Router,
    public citasService: CitasService,
    public serviciosApiService: ServiciosApiService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    if (!publicService.isBrowser) return;

    this.formulario = this.fb.group({
      celular: [
        324397394,
        [
          Validators.required, // El campo es obligatorio
          Validators.pattern(/^[3]{1}[0-9]{9}$/), // Patrón para números colombianos (ej: 3XXXXXXXXX)
          Validators.minLength(10), // Longitud mínima
          Validators.maxLength(10), // Longitud máxima
        ],
      ],
      categoria: ['', Validators.required],
      servicio: ['', Validators.required],
      categoria2: [''],
      servicio2: [''],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });

    this.token = localStorage.getItem('tokenNicolN')!;

    this.setDateHourSelected();
    this.getServicios();
    this.setDisabledSelects();
  }

  setDisabledSelects() {
    this.formulario.get('categoria')?.disable();
    this.formulario.get('servicio')?.disable();

    this.formulario.get('fecha')?.disable();
    this.formulario.get('hora')?.disable();

    this.formulario.get('celular')?.valueChanges.subscribe(() => {
      const celularControl = this.formulario.get('celular');
      if (celularControl?.valid) {
        this.formulario.get('categoria')?.enable();
      } else {
        this.formulario.get('categoria')?.disable();
        this.formulario.get('servicio')?.disable();

        this.formulario.get('categoria')?.setValue('');
        this.formulario.get('servicio')?.setValue('');
      }
    });
  }

  get campoCelular() {
    return this.formulario?.get('celular');
  }

  setDateHourSelected() {
    const rawDate = this.citasService.SelectDate; // '04/14/2025'
    const rawTime = this.citasService.hourSelected; // '09:00 AM'

    this.fechaISO = new Date(rawDate).toISOString().split('T')[0]; // '2025-04-14'

    const [time, modifier] = rawTime.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    this.hora24 = `${hours.padStart(2, '0')}:${minutes}`;

    this.formulario.patchValue({
      fecha: this.fechaISO,
      hora: this.hora24,
    });
  }

  getServicios() {
    this.serviciosApiService.getServicios(this.token).subscribe({
      next: (res) => (this.todosLosServicios = res),
      error: (err) => console.error(err),
      complete: () => (this.categorias = Object.keys(this.todosLosServicios)),
    });
  }

  oncategoriaChange(target: EventTarget | null) {
    const categoria = (target as HTMLSelectElement).value;
    this.serviciosDisponibles = this.todosLosServicios[categoria] || [];
    this.formulario.get('servicio')?.setValue('');
    this.formulario.get('servicio')?.enable();
    this.infoServicio = '';
  }

  oncategoria2Change(target: EventTarget | null) {
    const categoria = (target as HTMLSelectElement).value;
    this.serviciosDisponibles2 = this.todosLosServicios[categoria] || [];
    this.formulario.get('servicio2')?.setValue('');
    this.formulario.get('servicio2')?.enable();
    this.infoServicio = '';
  }

  onServicioChange(target: EventTarget | null) {
    const nombreServicio = (target as HTMLSelectElement).value;
    const categoria = this.formulario.value.categoria;
    this.servicioSelected = this.todosLosServicios[categoria]?.find(
      (s) => s._id === nombreServicio
    )!;

    this.totalPrecio =
      this.servicioSelected2 && this.servicioSelected2.precio
        ? this.servicioSelected2.precio + this.servicioSelected.precio
        : this.servicioSelected.precio;
    this.totalDuracion =
      this.servicioSelected2 && this.servicioSelected2.duracion
        ? this.servicioSelected2.duracion + this.servicioSelected.duracion
        : this.servicioSelected.duracion;
  }

  onServicio2Change(target: EventTarget | null) {
    const nombreServicio = (target as HTMLSelectElement).value;
    const categoria = this.formulario.value.categoria2;
    this.servicioSelected2 = this.todosLosServicios[categoria]?.find(
      (s) => s._id === nombreServicio
    )!;

    this.totalPrecio =
      this.servicioSelected.precio + this.servicioSelected2.precio;
    this.totalDuracion =
      this.servicioSelected.duracion + this.servicioSelected2.duracion;
  }

  toggleExtraServicio() {
    if (this.segundoServicio) {
      this.formulario.get('categoria2')?.setValue('');
      this.formulario.get('servicio2')?.setValue('');
      this.serviciosDisponibles2 = [];

      this.totalPrecio =
        this.todosLosServicios[this.formulario.value.categoria]?.find(
          (s) => s._id === this.formulario.value.servicio
        )?.precio || 0;
      this.totalDuracion =
        this.todosLosServicios[this.formulario.value.categoria]?.find(
          (s) => s._id === this.formulario.value.servicio
        )?.duracion || 0;

      this.servicioSelected2 = {
        nombre: '',
        precio: 0,
        duracion: 0,
        _id: '',
      };
    }

    this.formulario.get('servicio2')?.disable();
    this.segundoServicio = !this.segundoServicio;
  }

  submitFormCreateCita() {
    if (this.formulario.valid) {
      // Remove empty service entries
      const servicios = [
        this.formulario.value.servicio
      ];
      
      if (this.segundoServicio && this.formulario.value.servicio2) {
        servicios.push(this.formulario.value.servicio2);
      }
      
      let form = {
        celular: this.formulario.value.celular,
        fecha: this.citasService.SelectDate,
        hora: this.citasService.hourSelected,
        servicio: servicios.filter(s => s), // Remove any null/undefined values
        duracion: this.totalDuracion,
        precio: this.totalPrecio,
      };

      // Disable form during submission
      this.formulario.disable();
      
      // Guardar el celular en localStorage para futuras consultas
      localStorage.setItem('ultimoCelular', form.celular.toString());
      
      this.citasService.createCita(this.token, form).subscribe({
        next: (res) => {
          this.notificationService.success('¡Cita creada con éxito! Recibirás confirmación por WhatsApp.');
          
          // Redirigir a la página de mis citas con el celular
          setTimeout(() => {
            this.router.navigate(['/mis-citas', form.celular]);
          }, 1500);
        },
        error: (err) => {
          console.error('Error al crear la cita:', err);
          this.notificationService.error(err.error?.mensaje || 'Error al crear la cita. Por favor, intenta nuevamente.');
          this.formulario.enable();
        },
        complete: () => {
          // Re-enable the form
          this.formulario.enable();
        },
      });
    }
  }
}
