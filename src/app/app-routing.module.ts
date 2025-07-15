import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes Cliente
import { ClienteDashboardComponent } from './components/cliente/cliente-dashboard/cliente-dashboard.component';
import { CrearCitaComponent } from './components/cliente/crear-cita/crear-cita.component';
import { ListaCitasComponent } from './components/cliente/lista-citas/lista-citas.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'salon',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'cliente',
    component: ClienteDashboardComponent,
  },
  {
    path: 'cliente/crear-cita',
    component: CrearCitaComponent,
  },
  {
    path: 'cliente/mis-citas',
    component: ListaCitasComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
