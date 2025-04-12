import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private apiUrl = `${environment.API_URL}citas`;

  readonly horaInicio = '09:00 AM';
  readonly HoraFin = '07:00 PM';

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

  today = new Date();
  month = this.today.getMonth();
  SelectDay = this.today.getDate();

  constructor(private http: HttpClient) {}

  headers(token: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
  }

  getCitas(token: string) {
    this.leerCitas(token).subscribe({
      next: (res: any) => (this.listCitasAll = res),
      error: (err: any) =>
        console.error('🚀 ~ citasService ~ leerCitas ~ err:', err),
      complete: () => this.getSelectDay(this.formatNumber(this.SelectDay)),
    });
  }

  leerCitas(token: string): Observable<any> {
    let headers = this.headers(token);

    return this.http.get<any>(this.apiUrl, { headers });
  }

  getSelectDay(day: string | number) {
    this.SelectDay = day as unknown as number;

    let f = this.formatNumber(Number(this.month) + 1) + '/' + day + '/2025';

    // Filtrar citas por fecha
    this.listCitasSelected = this.listCitasAll.filter(
      (c: { fecha: string }) => c.fecha === f
    );
    let populateArrayCitas = this.populateArrayCitas().filter(
      (item2) =>
        !this.listCitasSelected.length ||
        !this.listCitasSelected.some((item1) => item1.hora === item2.hora)
    );

    this.listCitasSelected = [...this.listCitasSelected, ...populateArrayCitas];


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
    console.log(
      '🚀 ~ CitasService ~ getSelectDay ~ this.listCitasSelected:',
      this.listCitasSelected
    );
    // if (this.flexWrap) this.cambiarModoCalendario();
  }

  populateArrayCitas() {
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

    const agenda = [];
    const ocupados = new Map();
    let fechaUnica = '';
    if (this.listCitasSelected.length) {
      fechaUnica = this.listCitasSelected[0]?.fecha;

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
    } else
      fechaUnica =
        this.formatNumber(Number(this.month) + 1) +
        '/' +
        this.SelectDay +
        '/2025';

    // Generar slots desde horaInicio hasta horaFin
    let horaActual = this.horaInicio;
    while (true) {
      if (horaActual === sumarHoras(this.HoraFin, 0)) break;

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
}
