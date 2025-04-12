import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListCitaComponent } from '@components/cita/list-cita/list-cita.component';
import { ReadCitaComponent } from '@components/cita/read-cita/read-cita.component';
import { ItemListCitaComponent } from '@components/cita/list-cita/item-list-cita/item-list-cita.component';

@NgModule({
  declarations: [
    CitasComponent,
    ListCitaComponent,
    ReadCitaComponent,
    ItemListCitaComponent,
  ],
  imports: [CommonModule, CitasRoutingModule, FontAwesomeModule, FormsModule],
})
export class CitasModule {}
