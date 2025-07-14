import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from '@services/Citas/citas.service';
import { PublicService } from '@services/Public/public.service';

@Component({
  selector: 'app-edit-cita',
  templateUrl: './edit-cita.component.html',
  styleUrls: ['./edit-cita.component.css']
})
export class EditCitaComponent implements OnInit {
  formulario!: FormGroup;
  citaId!: string;
  token!: string;
  loading = false;
  cita: any;

  estados = [
    'Pendiente',
    'Aprobada',
    'Notificada',
    'En progreso',
    'Completada',
    'Cancelada por clienta',
    'Cancelada por salón',
    'No asistió',
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private citasService: CitasService,
    public publicService: PublicService
  ) {
    if (!this.publicService.isBrowser) return;

    this.token = localStorage.getItem('tokenNicolN')!;
    if (!this.token) {
      this.router.navigate(['/salon']);
      return;
    }

    this.formulario = this.fb.group({
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get the appointment ID from the route
    this.route.params.subscribe(params => {
      this.citaId = params['id'];
      this.getCitaDetails();
    });
  }

  getCitaDetails(): void {
    this.loading = true;
    // Find the appointment in the list
    this.cita = this.citasService.listCitasAll.find(c => c._id === this.citaId);
    
    if (this.cita) {
      this.formulario.patchValue({
        estado: this.cita.estado
      });
      this.loading = false;
    } else {
      // If not found in the list, fetch it directly
      this.citasService.getCitaById(this.token, this.citaId).subscribe({
        next: (res) => {
          this.cita = res;
          this.formulario.patchValue({
            estado: this.cita.estado
          });
        },
        error: (err) => {
          console.error('Error al obtener la cita:', err);
          alert('Error al obtener los detalles de la cita');
          this.router.navigate(['/dashboard/citas']);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  submitFormUpdateCita(): void {
    if (this.formulario.valid) {
      this.loading = true;
      const data = {
        estado: this.formulario.value.estado
      };

      this.citasService.updateCita(this.token, this.citaId, data).subscribe({
        next: (res) => {
          alert('Cita actualizada correctamente');
          // Update the appointment in the list
          const index = this.citasService.listCitasAll.findIndex(c => c._id === this.citaId);
          if (index !== -1) {
            this.citasService.listCitasAll[index].estado = data.estado;
          }
          this.router.navigate(['/dashboard/citas']);
        },
        error: (err) => {
          console.error('Error al actualizar la cita:', err);
          alert(err.error?.mensaje || 'Error al actualizar la cita');
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  cancelarCita(): void {
    this.router.navigate(['/dashboard/citas']);
  }
}
