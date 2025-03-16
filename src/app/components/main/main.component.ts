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

  loadedStatus: boolean[] = []; // Array para rastrear imágenes cargadas
  totalImages: number;

  constructor() {
    this.totalImages = this.firstGrid.length + this.secondGrid.length;
    this.loadedStatus = new Array(this.totalImages).fill(false);
  }

  onImageLoad(index: number) {
    this.loadedStatus[index] = true;
  }

  shouldLoadImage(index: number): boolean {
    return index === 0 || this.loadedStatus[index - 1];
  }
}

/* 

  constructor() {
    // Inicializa el array de estado de carga con false
    const totalImages = this.firstGrid.length + this.secondGrid.length;
  }

  onImageLoad(index: number) {
  }

  shouldLoadImage(index: number): boolean {
    // Cargar la imagen si es la primera o si la anterior ya se cargó
  } */
