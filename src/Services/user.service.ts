import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  updateUserToken(token: string): void {
    localStorage.setItem('UserToken', token);
    console.log(jwtDecode(token));
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('UserToken');
    if (!token) return false;

    return !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    const dToken = jwtDecode(token);
    return Date.now() > dToken['exp']! * 1000;
  }
}
