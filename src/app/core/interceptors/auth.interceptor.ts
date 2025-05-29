import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { routeNames } from '../../app.routes';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Inject Router
  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
    catchError(error => {
      if (error.status === 401) {
        router.navigate([routeNames.logout.path]); // Navigate to logout on 401
      }
      return throwError(() => error); // rethrow so it can be caught downstream
    })
  );
};