import { Component } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-serv',
  templateUrl: './serv.component.html',
  styleUrls: ['./serv.component.css'],
})
export class ServComponent {
  faChevronRight = faChevronRight;
  cardArray = [
    {
      titulo: 'Acrílicas Esculpidas con Encanto y Pasión',
      descripcion:
        ' Transforma tus manos con uñas acrílicas esculpidas, elegantes y personalizadas para brillar siempre.',
      href: '#',
      smallText: 'Duración Aproxi. 3 a 4 semanas en buen estado',
      textLink: 'Más',
    },
    {
      titulo: 'Recubrimiento de Acrílico para Uñas Fuertes',
      descripcion:
        'Descubre y luce el recubrimiento de acrílico para uñas que aporta resistencia, brillo además de un acabado impecable.',
      href: '#',
      smallText: 'Duración Aproxi. 2 a 3 semanas en buen estado',
      textLink: 'Descubre',
    },
    {
      titulo: 'Esmaltado Semipermanente un Diseño de Uñas Más Duradero',
      descripcion:
        'Uñas impecables con nuestro esmaltado semipermanente, resistente y de larga duración.',
      href: '#',
      smallText: 'Duración Aproxi. 2 a 3 semanas en buen estado',
      textLink: 'Contáctame',
    },
  ];
}
