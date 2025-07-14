import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'citas',
    loadChildren: () =>
      import('./modules/citas/citas.module').then((m) => m.CitasModule),
  },
  {
    path: 'mis-citas',
    loadChildren: () =>
      import('./modules/citas/citas.module').then((m) => m.CitasModule),
  },
  {
    path: 'mis-citas/:celular',
    loadChildren: () =>
      import('./modules/citas/citas.module').then((m) => m.CitasModule),
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
