import { ServiciosApiService } from './../../../services/ServiciosApi/servicios-api.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from '@services/Citas/citas.service';
import { PublicService } from '@services/Public/public.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-cita',
  templateUrl: './create-cita.component.html',
  styleUrls: ['./create-cita.component.css'],
})
export class CreateCitaComponent {
  formulario!: FormGroup;
  categorias!: Array<string>;
  serviciosDisponibles: any[] = [];
  infoServicio = '';
  todosLosServicios!: {
    [key: string]: Array<{
      nombre: string;
      precio: number;
      duracion: number;
    }>;
  };
  segundoServicio = false;

  token!: string;
  fechaISO!: string;
  hora24!: string;
  totalPrecio = 0;
  totalDuracion = 0;

  constructor(
    public publicService: PublicService,
    public router: Router,
    public citasService: CitasService,
    public serviciosApiService: ServiciosApiService,
    private fb: FormBuilder
  ) {
    if (!publicService.isBrowser) return;

    this.formulario = this.fb.group({
      celular: [
        null,
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
    this.serviciosDisponibles = this.todosLosServicios[categoria] || [];
    this.formulario.get('servicio2')?.setValue('');
    this.formulario.get('servicio2')?.enable();
    this.infoServicio = '';
  }

  onServicioChange(target: EventTarget | null) {
    const nombreServicio = (target as HTMLSelectElement).value;
    const categoria = this.formulario.value.categoria;
    const servicio = this.todosLosServicios[categoria]?.find(
      (s) => s.nombre === nombreServicio
    );
    if (servicio) {
      this.totalPrecio = servicio.precio;
      this.totalDuracion = servicio.duracion;
    }
  }

  onServicio2Change(target: EventTarget | null) {
    const nombreServicio = (target as HTMLSelectElement).value;
    const categoria = this.formulario.value.categoria;
    const servicio = this.todosLosServicios[categoria]?.find(
      (s) => s.nombre === nombreServicio
    );
    if (servicio) {
      this.totalPrecio +=
        servicio.precio; /* No está sumando los valores de los respectivos selects */
      this.totalDuracion += servicio.duracion;
    }
  }

  agregarServicio() {
    this.segundoServicio = !this.segundoServicio;
  }

  submitFormCreateCita() {
    if (this.formulario.valid) {
      console.log(
        '🚀 ~ CreateCitaComponent ~ submitFormCreateCita ~ this.formulario:',
        this.formulario.value
      );
      this.citasService.createCita(this.token, {}).subscribe({
        next: (res) => {},
        error: (err) => {},
        complete: () => {},
      });
    }
  }
}
