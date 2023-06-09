import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/components/login/login.component"
import { AuthGuard } from './auth/auth.guard';
import { RegistrationComponent } from './auth/components/registration/registration.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {
    path: "",
    component: TodoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "",
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: "registration",
        component: RegistrationComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
