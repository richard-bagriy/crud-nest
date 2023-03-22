import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  hide: boolean = true;
  error: string = "";

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
     this.registrationForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
     })
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    const { email, username, password } = this.registrationForm.value;
    this.authService.registration(email, username, password).pipe(first()).subscribe(
      (message: any) => {
        this.error = message.message
      },
      error => {
        this.error = error;
      }
    );
;  }

}
