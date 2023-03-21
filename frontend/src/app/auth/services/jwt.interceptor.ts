import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
        const currentUser = this.authService.currentUserValue;
        const newRequest = currentUser && currentUser.accessToken 
        ? request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.accessToken}`
            }
        })
        : request;

		return next.handle(newRequest);
	}
}

export const jwtInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true };