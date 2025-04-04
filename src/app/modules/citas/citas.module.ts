import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CitasComponent],
  imports: [CommonModule, CitasRoutingModule, FontAwesomeModule, FormsModule],
})
export class CitasModule {}
