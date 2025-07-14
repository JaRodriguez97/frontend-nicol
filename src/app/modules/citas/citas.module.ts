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
import { MisCitasComponent } from '@components/cita/mis-citas/mis-citas.component';
import { SharedModule } from '@components/shared/shared.module';

@NgModule({
  declarations: [
    CitasComponent,
    ListCitaComponent,
    ReadCitaComponent,
    ItemListCitaComponent,
    CreateCitaComponent,
    MisCitasComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class CitasModule {}
