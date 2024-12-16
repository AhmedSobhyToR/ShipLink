import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const LoadingInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const loadingService = inject(LoadingService); // Use `inject` to access services

  loadingService.startLoading(); // Set loading to true at the start of a request

  return next(req).pipe(
    finalize(() => {
      loadingService.endLoading(); // Set loading to false when the request completes
    })
  );
};
