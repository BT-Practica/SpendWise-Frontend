import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth_service/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized request:', error);
        } else {
          console.error('HTTP Error:', error);
        }
        return throwError(error);
      })
    );
  } else {
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }
};
