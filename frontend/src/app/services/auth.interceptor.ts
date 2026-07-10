import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isAdminRequest = req.url.includes('/api/admin');
  const request = isAdminRequest ? req.clone({ withCredentials: true }) : req;

  if (!isAdminRequest) {
    return next(request);
  }

  const auth = inject(AuthService);
  const router = inject(Router);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.endsWith('/admin/login')) {
        auth.clearSession();
        router.navigate(['/admin/login']);
      }
      return throwError(() => error);
    })
  );
};
