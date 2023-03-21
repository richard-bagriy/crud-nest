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
  submitted: boolean = false;
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
    this.submitted = true;
    alert("what");

    console.log(this.registrationForm.invalid, "-");

    if (this.registrationForm.invalid) {
      return;
    }

    const { email, username, password } = this.registrationForm.value;
    this.authService.registration(email, username, password).pipe(first()).subscribe(
      () => {
        this.error = ""
      },
      error => {
        this.error = error;
      }
    );
;  }

}
