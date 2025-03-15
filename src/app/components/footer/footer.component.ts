import { Component } from '@angular/core';
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faTikTok = faTiktok;

  constructor() {}
}
