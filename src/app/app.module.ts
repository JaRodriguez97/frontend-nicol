import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './components/shared/shared.module';
import { LandingModule } from './modules/landing/landing.module';

// Componentes Cliente
import { ClienteDashboardComponent } from './components/cliente/cliente-dashboard/cliente-dashboard.component';
import { CrearCitaComponent } from './components/cliente/crear-cita/crear-cita.component';
import { ListaCitasComponent } from './components/cliente/lista-citas/lista-citas.component';
import { CelularInputComponent } from './components/cliente/celular-input/celular-input.component';

// Componentes Shared
import { CitaCardComponent } from './components/shared/cita-card/cita-card.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { ServicioCardComponent } from './components/shared/servicio-card/servicio-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteDashboardComponent,
    CrearCitaComponent,
    ListaCitasComponent,
    CelularInputComponent,
    CitaCardComponent,
    ConfirmDialogComponent,
    LoadingSpinnerComponent,
    ServicioCardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    LandingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
