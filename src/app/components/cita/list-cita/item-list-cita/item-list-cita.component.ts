import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitasService } from '@services/Citas/citas.service';
import { PublicService } from '@services/Public/public.service';

@Component({
  selector: 'app-item-list-cita',
  templateUrl: './item-list-cita.component.html',
  styleUrls: ['./item-list-cita.component.css'],
})
export class ItemListCitaComponent {
  constructor(
    public publicService: PublicService,
    private router: Router,
    public citasService: CitasService
  ) {
    if (!this.publicService.isBrowser) return;
    let token = localStorage.getItem('tokenNicolN')!;

    if (!token) this.router.navigate(['/salon']);
    else this.citasService.getCitas(token);
  }


}
