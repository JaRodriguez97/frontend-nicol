import { Component } from '@angular/core';
import {
  faEnvelope,
  faMapMarked,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarked = faMapMarked;
}
