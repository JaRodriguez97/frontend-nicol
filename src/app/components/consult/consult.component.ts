import {
  faCalendarDays,
  faComments,
} from '@fortawesome/free-regular-svg-icons';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css'],
})
export class ConsultComponent {
  faComments = faComments;
  faCalendarDays = faCalendarDays;
}
