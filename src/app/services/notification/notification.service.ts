import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]);
  private notificationCounter = 0;

  constructor() {}

  // Obtener todas las notificaciones activas
  getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }

  // Mostrar una notificación de éxito
  success(message: string, duration: number = 4000): void {
    this.addNotification({
      message,
      type: 'success',
      duration,
      id: this.notificationCounter++,
    });
  }

  // Mostrar una notificación de error
  error(message: string, duration: number = 5000): void {
    this.addNotification({
      message,
      type: 'error',
      duration,
      id: this.notificationCounter++,
    });
  }

  // Mostrar una notificación informativa
  info(message: string, duration: number = 3000): void {
    this.addNotification({
      message,
      type: 'info',
      duration,
      id: this.notificationCounter++,
    });
  }

  // Mostrar una notificación de advertencia
  warning(message: string, duration: number = 4000): void {
    this.addNotification({
      message,
      type: 'warning',
      duration,
      id: this.notificationCounter++,
    });
  }

  // Añadir una nueva notificación
  private addNotification(notification: Notification): void {
    const currentNotifications = this.notifications.value;
    this.notifications.next([...currentNotifications, notification]);

    if (notification.duration) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, notification.duration);
    }
  }

  // Eliminar una notificación por su ID
  removeNotification(id: number): void {
    const currentNotifications = this.notifications.value;
    this.notifications.next(
      currentNotifications.filter((notification) => notification.id !== id)
    );
  }

  // Limpiar todas las notificaciones
  clearAll(): void {
    this.notifications.next([]);
  }
}
