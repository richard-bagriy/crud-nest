import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule, MaterialModule],
  exports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule, LoginComponent]
})
export class AuthModule { }
