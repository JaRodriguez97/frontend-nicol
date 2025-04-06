import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '@services/Public/public.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private publicService: PublicService, private router: Router) {
    if (!this.publicService.isBrowser) return;

    let token = localStorage.getItem('tokenNicolN');

    this.router.navigate([!token ? 'salon' : '/dashboard/citas']);
  }
}
