import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
	templateUrl:  './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	submitted = false;
	returnUrl: string;
	error: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required, Validators.email],
			password: ['', Validators.required]
		});

		this.authService.logout();
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	get f() {
		return this.loginForm.controls;
	}

	onSubmit() {
		this.submitted = true;

		if (this.loginForm.invalid) { 
			return;
		}

		this.authService
			.login(this.f['email'].value, this.f['password'].value)
			.pipe(first())
			.subscribe(
				() => {
					this.error = '';
					this.router.navigate([this.returnUrl]);
				},
				error => {
					this.error = error;
				}
			);
	}
}