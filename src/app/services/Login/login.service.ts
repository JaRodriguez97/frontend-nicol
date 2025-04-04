import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `${environment.API_URL}usuarios/login`;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
