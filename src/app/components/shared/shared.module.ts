import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NotificacionesComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [NotificacionesComponent, CommonModule, FontAwesomeModule],
})
export class SharedModule {}
