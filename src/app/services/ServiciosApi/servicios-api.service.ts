import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiciosApiService {
  private apiUrl = `${environment.API_URL}servicios`;

  constructor(private http: HttpClient) {}

  headers(token?: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token!,
    });
  }

  getServicios(token: string) {
    let headers = this.headers(token);

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
