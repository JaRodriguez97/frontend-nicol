import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CitasService } from '@services/Citas/citas.service';
import { PublicService } from '@services/Public/public.service';

@Component({
  selector: 'app-list-cita',
  templateUrl: './list-cita.component.html',
  styleUrls: ['./list-cita.component.css'],
})
export class ListCitaComponent {
  faArrowLeft = faArrowLeft;

  fechasPorMes: string[] = [];
  meses: { [key: string]: string[] } = {};
  mes: string = '';
  numberF = Number;

  nombresMeses = this.obtenerNombresMeses();
  nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  flexWrap = false;

  constructor(
    public publicService: PublicService,
    private router: Router,
    public citasService: CitasService
  ) {
    if (!this.publicService.isBrowser) return;
    let token = localStorage.getItem('tokenNicolN')!;

    if (!token) this.router.navigate(['/salon']);

    this.generarAgenda2025();
    this.cambiarMes(this.citasService.month);
  }

  obtenerNombresMeses() {
    const formatter = new Intl.DateTimeFormat('es-ES', { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => {
      const fecha = new Date(2025, i);
      return (
        formatter.format(fecha).charAt(0).toUpperCase() +
        formatter.format(fecha).slice(1)
      );
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

    this.citasService.getSelectDay(this.citasService.SelectDay);
  }

  selectedDay(i: number): boolean {
    return i == this.citasService.SelectDay;
  }
}
