import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowLeft,
  faBell,
  faCalendar,
  faHome,
  faPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { CitasService } from '@services/Citas/citas.service';
import { PublicService } from '@services/Public/public.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
})
export class CitasComponent {
  faPlus = faPlus;
  faHome = faHome;
  faCalendar = faCalendar;
  faBell = faBell;
  faUser = faUser;
  faArrowLeft = faArrowLeft;

  fechasPorMes: string[] = [];
  meses: { [key: string]: string[] } = {};
  mes: string = '';
  numberF = Number;

  listCitasSelected = [
    {
      celular: 3243973949,
      fecha: '01/04/2025',
      hora: '08:00 AM',
      servicio: [
        {
          nombre: 'Manos sencillo un solo tono o francés',
          duracion: 120,
          categoria: 'Semipermanente',
        },
      ],
      estado: 'Aprobada',
    },
  ];
  listCitas = [
    {
      celular: 3243973949,
      fecha: '01/04/2025',
      hora: '08:00 AM',
      servicio: [
        {
          nombre: 'Manos sencillo un solo tono o francés',
          duracion: 120,
          categoria: 'Semipermanente',
        },
      ],
      estado: 'Aprobada',
    },
  ];

  nombresMeses = [
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
  nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  today = new Date();
  month = this.today.getMonth();
  SelectDay = this.today.getDate();

  flexWrap = false;

  constructor(
    public publicService: PublicService,
    private router: Router,
    private citasService: CitasService
  ) {
    if (!this.publicService.isBrowser) return;
    let token = localStorage.getItem('token')!;

    if (!token) this.router.navigate(['/salon']);

    this.getCitas(token);
    this.generarAgenda2025();
    this.cambiarMes(this.month);
    setTimeout(() => this.getSelectDay(this.formatNumber(this.SelectDay)), 500);
  }

  getCitas(token: string) {
    this.citasService.leerCitas(token).subscribe({
      next: (res: any) => (this.listCitas = res),
      error: (err: any) =>
        console.error(
          '🚀 ~ CitasComponent ~ citasService.leerCitas ~ err:',
          err
        ),
    });
  }

  generarAgenda2025() {
    for (let mes = 0; mes < 12; mes++) {
      // for (let mes = today.getMonth(); mes < 12; mes++) {
      const diasMes: string[] = [];
      const diasEnMes = new Date(2025, mes + 1, 0).getDate();

      for (let dia = 1; dia <= diasEnMes; dia++) {
        // for (let dia = today.getDay(); dia <= diasEnMes; dia++) {
        const fecha = new Date(2025, mes, dia);
        diasMes.push(`${this.nombresDias[fecha.getDay()]} ${dia}`);
      }
      this.meses[this.nombresMeses[mes]] = diasMes;
    }
  }

  cambiarMes(mes: number) {
    this.mes = this.nombresMeses[mes];
    this.fechasPorMes = this.meses[this.mes];

    this.getSelectDay(this.SelectDay);
  }

  selectedDay(i: number): boolean {
    return i == this.SelectDay;
  }

  getSelectDay(day: string | number) {
    this.SelectDay = day as unknown as number;

    let f = day + '/' + this.formatNumber(Number(this.month) + 1) + '/2025';

    this.listCitasSelected = this.listCitas.filter((c: any) => c.fecha == f);

    if (this.flexWrap) this.cambiarModoCalendario();
  }

  formatNumber(date: number) {
    return date < 10 ? '0' + date : date;
  }

  cambiarModoCalendario() {
    this.flexWrap = !this.flexWrap;
  }
}
