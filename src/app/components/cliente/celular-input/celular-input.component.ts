import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '@services/cliente.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-celular-input',
  templateUrl: './celular-input.component.html',
  styleUrls: ['./celular-input.component.css']
})
export class CelularInputComponent implements OnInit {
  celularForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService,
    private notificationService: NotificationService
  ) {
    this.celularForm = this.fb.group({
      celular: ['', [
        Validators.required,
        Validators.pattern(/^3\d{9}$/),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]]
    });
  }

  ngOnInit(): void {
    // Si ya hay un celular guardado, redirigir al dashboard
    if (this.clienteService.hasCelular()) {
      this.router.navigate(['/cliente/mis-citas']);
    }
  }

  onSubmit(): void {
    if (this.celularForm.valid) {
      this.isLoading = true;
      const celular = parseInt(this.celularForm.value.celular, 10);
      
      if (this.clienteService.setCelular(celular)) {
        this.notificationService.success('Número guardado correctamente');
        this.router.navigate(['/cliente/crear-cita']);
      } else {
        this.notificationService.error('Número de celular inválido');
      }
      
      this.isLoading = false;
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.celularForm.controls).forEach(key => {
      this.celularForm.get(key)?.markAsTouched();
    });
  }

  get celular() {
    return this.celularForm.get('celular');
  }

  getCelularError(): string {
    const control = this.celular;
    if (control?.hasError('required')) {
      return 'El número de celular es requerido';
    }
    if (control?.hasError('pattern')) {
      return 'El número debe comenzar con 3 y tener 10 dígitos';
    }
    if (control?.hasError('minlength') || control?.hasError('maxlength')) {
      return 'El número debe tener exactamente 10 dígitos';
    }
    return '';
  }

  formatCelular(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    this.celularForm.patchValue({ celular: value });
  }
}