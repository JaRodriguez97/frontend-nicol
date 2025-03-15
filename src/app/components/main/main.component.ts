import { Component } from '@angular/core';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  faWhatsapp = faWhatsapp;
  firstGrid = [1, 2, 3, 4, 5, 6];
  secondGrid = [10, 9, 8, 7, 6, 5];
  allGrids = [this.firstGrid, this.secondGrid];
}
