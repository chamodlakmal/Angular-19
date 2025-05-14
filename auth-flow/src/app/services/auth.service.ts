import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import {
  LoginRequest,
  LoginResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
} from '../interfaces/auth.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://projectapi.gerasim.in/api/UserApp';

  http = inject(HttpClient);
  storageService = inject(StorageService);
  router = inject(Router);

  constructor() {}

  login(loginRequest: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, loginRequest)
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.storageService.setAuthData(
            response.data.token,
            response.data.refreshToken,
            response.data.emailId
          );
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
  }

  logout() {
    this.storageService.removeAuthData();
    this.router.navigate(['/']);
  }

  refreshToken() {
    const request: TokenRefreshRequest = {
      emailId: this.storageService.getEmail(),
      token: this.storageService.getAuthToken(),
      refreshToken: this.storageService.getRefreshToken(),
    };
    return this.http
      .post<TokenRefreshResponse>(`${this.API_URL}/refresh`, request)
      .pipe(
        tap((response) => {
          console.log('Token refreshed successfully:', response);
          this.storageService.setAuthData(
            response.data.token,
            response.data.refreshToken,
            response.data.emailId
          );
        }),
        catchError((error) => {
          console.error('Token refresh failed:', error);
          this.storageService.removeAuthData();
          this.router.navigate(['/']);
          return throwError(() => error);
        })
      );
  }
}
