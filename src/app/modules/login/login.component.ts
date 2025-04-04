import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '@services/Login/login.service';
import { PublicService } from '@services/Public/public.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  faArrowLeft = faArrowLeft;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    public publicService: PublicService,
    private router: Router
  ) {
    if (!this.publicService.isBrowser) return;

    if (localStorage.getItem('token')) this.router.navigate(['/dashboard']);

    this.loginForm = this.fb.group({
      celular: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Datos enviados:', this.loginForm.value);
      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);

          if (!this.publicService.isBrowser) return;

          localStorage.setItem('token', response.token);

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error en la solicitud:', error);
        },
        complete: () => {
          console.log('Solicitud completada');
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
