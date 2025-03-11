import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = `${environment.loginServiceUrl}`;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  // Trimite cererea de autentificare către backend
  login(username: string, password: string) {
    const apiUrl = `${this.baseUrl}/login`;
    return this.http.post<{ success: boolean; message: string; token?: string }>(
      apiUrl,
      { username, password }
    );
  }

  resetPasswordRequest(email: string) {
    const apiUrl = `${this.baseUrl}/reset-password/request`;
    return this.http.post<{ success: boolean; message: string }>(
      apiUrl,
      { email });
  }

  resetPassword(body: { token: string; newPassword: string }) {
    const apiUrl = `${this.baseUrl}/reset-password/reset`;
    return this.http.post<{ success: boolean; message: string }>(apiUrl, body);
  }



  // Verifică dacă localStorage este disponibil
  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  // Salvează tokenul în localStorage
  saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Obține tokenul din localStorage
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Validează tokenul
  validateToken(): boolean {
    const token = this.getToken();
    return !!token; //
  }

  // Verifică dacă utilizatorul este autentificat
  isLoggedIn(): boolean {
    return !!this.getToken() && this.validateToken();
  }

  // Logout: șterge tokenul și redirecționează utilizatorul la login
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.tokenKey);
    }
    this.router.navigate(['/login']);
  }
}
