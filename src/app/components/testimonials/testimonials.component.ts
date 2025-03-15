import { Component } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  faStar = faStar;
  testimonios = [
    {
      texto:
        '"Superó mis expectativas en cada arreglo de uñas, la amabilidad y los precios espectaculares."',
      img: 'https://placehold.co/40x40/EEE/31343C',
      alt: 'Imagen de Juana Pérez',
      title: 'Imagen de Juana Pérez',
      nombre: 'Juana Pérez',
      servicio: 'Manicure y Pedicure',
    },
    {
      texto:
        '"El trabajo del diseño de uñas fue profesional y muy eficiente, además de mucha amabilidad."',
      img: 'https://placehold.co/40x40/EEE/31343C',
      alt: 'Imagen de María López',
      title: 'Imagen de María López',
      nombre: 'María López',
      servicio: 'Uñas Acrilicas',
    },
    {
      texto:
        '"Recomiendo su arreglo de uñas sin dudarlo, es la mejor con los diseños."',
      img: 'https://placehold.co/40x40/EEE/31343C',
      alt: 'Imagen de Carla Gómez',
      title: 'Imagen de Carla Gómez',
      nombre: 'Carla Gómez',
      servicio: 'Diseño Semipermanente',
    },
  ];
}
