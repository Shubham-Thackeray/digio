import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { GauthService } from './gauth.service';

@Injectable()
export class GAuthInterceptor implements HttpInterceptor {
  private router;
  constructor(private authenticationService: GauthService, inj: Injector) {
    this.router = inj.get(GauthService);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const currentUser = this.authenticationService.getToken();
    const isLoggedIn = currentUser && currentUser;
    // const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError(error => {
        console.log('found error');
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.error.code === 401) ) {
          this.authenticationService.logout();
          return throwError(error);
        } else {
          return throwError(error);
        }
      }),
    );
  }
}
