import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService,
            private messageService: MessageService,
            private router: Router,
            private cookieService: CookieService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token && token != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
            let errorMessage = '';

            if (error.error instanceof ErrorEvent) {
                // Erreur côté client
                errorMessage = `Erreur: ${error.error.message}`;
            } else {
                // Erreur côté serveur
                errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
            }

            if(error.status == 401){
                this.cookieService.deleteAll();
                this.router.navigateByUrl("/auth/login");
            }
            this.messageService.add(
                {
                    severity: 'error',
                    summary: 'Information',
                    detail: errorMessage
                }
            );

            // Afficher l'erreur ou la gérer comme tu le souhaites
            console.error(errorMessage);

            // Retourner l'erreur pour qu'elle puisse être gérée par l'appelant
            return throwError(errorMessage);
        })
    );
  }


}
