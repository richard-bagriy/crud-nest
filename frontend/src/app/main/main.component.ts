import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  public loggedIn: boolean = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loggedIn = !!this.authService.currentUserValue
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
