import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CitasService } from '@services/Citas/citas.service';
import { PublicService } from '@services/Public/public.service';

const horaInicio = '09:00 AM',
  HoraFin = '06:00 PM';
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

  listCitasSelected = [
    {
      _id: '',
      celular: 3243973949,
      fecha: '04/01/2025',
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
  listCitasAll = [
    {
      _id: '',
      celular: 3243973949,
      fecha: '04/01/2025',
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

  nombresMeses = this.obtenerNombresMeses();
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
    let token = localStorage.getItem('tokenNicolN')!;

    if (!token) this.router.navigate(['/salon']);

    this.getCitas(token);
    this.generarAgenda2025();
    this.cambiarMes(this.month);
    // setTimeout(() => this.getSelectDay(this.formatNumber(this.SelectDay)), 500);
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

  getCitas(token: string) {
    this.citasService.leerCitas(token).subscribe({
      next: (res: any) => (this.listCitasAll = res),
      error: (err: any) =>
        console.error(
          '🚀 ~ CitasComponent ~ citasService.leerCitas ~ err:',
          err
        ),
      complete: () => this.getSelectDay(this.formatNumber(this.SelectDay)),
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

    let f = this.formatNumber(Number(this.month) + 1) + '/' + day + '/2025';

    // Filtrar citas por fecha
    this.listCitasSelected = this.listCitasAll.filter(
      (c: { fecha: string }) => c.fecha === f
    );

    this.listCitasSelected = [
      ...this.listCitasSelected,
      ...this.populateArrayCias().filter(
        (item2) =>
          !this.listCitasSelected.some((item1) => item1.hora === item2.hora)
      ),
    ];

    // Ordenar por fecha y hora
    this.listCitasSelected.sort(
      (
        a: { fecha: string; hora: string },
        b: { fecha: string; hora: string }
      ) => {
        const dateA = new Date(`${a.fecha} ${a.hora}`).getTime();
        const dateB = new Date(`${b.fecha} ${b.hora}`).getTime();
        return dateA - dateB;
      }
    );

    if (this.flexWrap) this.cambiarModoCalendario();
  }

  populateArrayCias() {
    const parseHora = (horaStr: string) => {
      const [time, modifier] = horaStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      return { hours, minutes };
    };

    const formatHora = (hours: any, minutes: string) => {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const h = hours % 12 || 12;
      const m = minutes.toString().padStart(2, '0');
      return `${h < 10 ? '0' + h : h}:${m} ${ampm}`;
    };

    const sumarHoras = (horaStr: string, minutosASumar: number) => {
      const { hours, minutes } = parseHora(horaStr);
      const totalMinutes: any = hours * 60 + minutes + minutosASumar;
      const newHours: any = Math.floor(totalMinutes / 60);
      const newMinutes: any = totalMinutes % 60;
      return formatHora(newHours, newMinutes);
    };

    const fechaUnica = this.listCitasSelected[0]?.fecha;
    const agenda = [];

    const ocupados = new Map();

    // Marcar espacios ocupados
    this.listCitasSelected.forEach((cita) => {
      const { hora, servicio } = cita;
      const duracion = servicio[0].duracion;
      const bloques = Math.ceil(duracion / 60);
      let horaActual = hora;

      for (let i = 0; i < bloques; i++) {
        ocupados.set(horaActual, { ...cita });
        horaActual = sumarHoras(horaActual, 60);
      }
    });

    // Generar slots desde horaInicio hasta horaFin
    let horaActual = horaInicio;
    while (true) {
      if (horaActual === sumarHoras(HoraFin, 0)) break;

      if (ocupados.has(horaActual)) {
        agenda.push(ocupados.get(horaActual));
      } else {
        agenda.push({
          _id: '',
          celular: '',
          fecha: fechaUnica,
          hora: horaActual,
          servicio: [],
          estado: '',
        });
      }

      horaActual = sumarHoras(horaActual, 60);
    }

    return agenda;
  }

  formatNumber(date: number) {
    return date < 10 ? '0' + date : date;
  }

  cambiarModoCalendario() {
    this.flexWrap = !this.flexWrap;
  }
}
