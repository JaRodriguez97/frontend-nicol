import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../../services/notification.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications.subscribe(
      notifications => this.notifications = notifications
    );
  }

  removeNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }

  getNotificationClass(type: string): string {
    const baseClass = 'toast px-6 py-4 rounded-lg shadow-lg text-white max-w-md';
    switch (type) {
      case 'success':
        return `${baseClass} bg-green-500`;
      case 'error':
        return `${baseClass} bg-red-500`;
      case 'warning':
        return `${baseClass} bg-yellow-500`;
      case 'info':
        return `${baseClass} bg-blue-500`;
      default:
        return `${baseClass} bg-gray-500`;
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'M5 13l4 4L19 7';
      case 'error':
        return 'M6 18L18 6M6 6l12 12';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z';
      case 'info':
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }
}