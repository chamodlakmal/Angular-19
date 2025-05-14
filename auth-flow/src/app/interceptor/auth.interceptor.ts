import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authService = inject(AuthService);
  const token = storageService.getAuthToken();
  if (token && !isAuthRequest(req)) {
    req = addToken(req, token);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(req, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function addToken(req: HttpRequest<any>, token: string | null) {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function isAuthRequest(req: HttpRequest<any>) {
  return req.url.includes('login') || req.url.includes('refresh');
}

const handle401Error = (
  request: any,
  next: HttpHandlerFn,
  authService: AuthService
) => {
  return authService.refreshToken().pipe(
    switchMap((response) => {
      return next(
        request.clone({
          setHeaders: {
            Authorization: `Bearer ${response.data.token}`,
          },
        })
      );
    }),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => error);
    })
  );
};
