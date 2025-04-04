import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private apiUrl = `${environment.API_URL}citas`;

  constructor(private http: HttpClient) {}

  headers(token: string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
  }

  leerCitas(token: string): Observable<any> {
    let headers = this.headers(token);

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
