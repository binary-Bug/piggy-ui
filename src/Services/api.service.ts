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

  getRegions(): Observable<any> {
    return this.http.get<any>(apiurl + 'Region/allRegions');
  }

  getRestaurentTypes(): Observable<any> {
    return this.http.get<any>(apiurl + 'Restaurent/types');
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

  registerUser(formData: any): Observable<string> {
    return this.http.post(
      apiurl + 'register/user',
      {
        email: formData.registerEmail,
        userName: formData.registerUsername,
        password: formData.registerPassword,
        phoneNumber: formData.registerNumber,
        regionId: formData.regionSelect,
      },
      { responseType: 'text' as const }
    );
  }

  registerRestaurent(formData: any): Observable<string> {
    return this.http.post(
      apiurl + 'register/restaurent',
      {
        email: formData.registerEmail,
        userName: formData.registerUsername,
        password: formData.registerPassword,
        phoneNumber: formData.registerNumber,
        restaurentName: formData.restaurentName,
        restaurentTypeId: formData.restaurentType,
      },
      { responseType: 'text' as const }
    );
  }
}
