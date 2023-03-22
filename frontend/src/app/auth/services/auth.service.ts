
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface ApplicationUser {
	access_token: string;
	refresh_token: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<ApplicationUser>;
	public currentUser: Observable<ApplicationUser>;

	constructor(private readonly http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<ApplicationUser>(
			JSON.parse(localStorage.getItem('user') as string)
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): ApplicationUser {
		return this.currentUserSubject.value;
	}

	login(email: string, password: string) {
		return this.http.post<any>('/api/auth/login', { email, password }).pipe(
			map(tokens => {
				if (tokens && tokens.access_token) {
					localStorage.setItem('user', JSON.stringify(tokens));
					this.currentUserSubject.next(tokens);
				}

				return tokens;
			})
		);
	}

	public registration(email: string, username: string, password: string) {
		return this.http.post('/api/auth/register', { email, username, password }).pipe()
	}

	logout() {
		localStorage.removeItem('user');
		this.currentUserSubject.next(null as unknown as ApplicationUser);
	}
}