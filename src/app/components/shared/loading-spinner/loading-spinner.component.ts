import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: string = '#cfb0be';
  @Input() message: string = 'Cargando...';
  @Input() showMessage: boolean = true;

  getSizeClass(): string {
    switch (this.size) {
      case 'small':
        return 'w-6 h-6';
      case 'large':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  }
}