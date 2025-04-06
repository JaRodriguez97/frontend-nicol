import { Component } from '@angular/core';
import {
  faBell,
  faCalendar,
  faHome,
  faPlus,
  faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
})
export class CitasComponent {
  faPlus = faPlus;
  faHome = faHome;
  faCalendar = faCalendar;
  faBell = faBell;
  faUser = faUser;
}
