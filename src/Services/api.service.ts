import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiurl } from '../configs/config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  constructor() {}

  getData(): Observable<any> {
    return this.http.get<any>(apiurl + 'weatherforecast/get/v1');
  }

  login(credentials: {
    loginEmail?: string | null;
    loginPassword?: string | null;
  }): Observable<string> {
    return this.http.post(
      apiurl + 'login',
      {
        usernameOrEmail: credentials.loginEmail,
        password: credentials.loginPassword,
      },
      { responseType: 'text' as const }
    );
  }
}
