import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule, LoginComponent]
})
export class AuthModule { }
