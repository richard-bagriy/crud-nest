import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from "./auth/components/login.component"
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [{
      path: "",
      component: HomeComponent
    }]
  },
  {
    path: "",
    children: [
      {
        path: 'login',
        component: LoginComponent
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
