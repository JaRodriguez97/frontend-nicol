import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from './citas.component';
import { ListCitaComponent } from '@components/cita/list-cita/list-cita.component';
import { ReadCitaComponent } from '@components/cita/read-cita/read-cita.component';
import { CreateCitaComponent } from '@components/cita/create-cita/create-cita.component';

const routes: Routes = [
  {
    path: '',
    component: CitasComponent,
    children: [
      {
        path: '',
        component: ListCitaComponent,
      },
      {
        path: 'create',
        component: CreateCitaComponent,
      },
      {
        path: ':id',
        component: ReadCitaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasRoutingModule {}
