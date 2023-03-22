import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { errorInterceptorProvider } from './auth/services/error.interceptor';
import { jwtInterceptorProvider } from './auth/services/jwt.interceptor';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { TodoComponent } from './todo/todo.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    TodoComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
  ],
  providers: [jwtInterceptorProvider, errorInterceptorProvider],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
