import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListCitaComponent } from '@components/cita/list-cita/list-cita.component';
import { ReadCitaComponent } from '@components/cita/read-cita/read-cita.component';
import { ItemListCitaComponent } from '@components/cita/list-cita/item-list-cita/item-list-cita.component';
import { CreateCitaComponent } from '@components/cita/create-cita/create-cita.component';

@NgModule({
  declarations: [
    CitasComponent,
    ListCitaComponent,
    ReadCitaComponent,
    ItemListCitaComponent,
    CreateCitaComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CitasModule {}
