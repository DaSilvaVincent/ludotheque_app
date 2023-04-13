import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {AdherentRequest} from "../models/interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'developpement_application_s4a01_p2';

  constructor(private authService: AuthService) {
  }

  get auth() {
    return this.authService;
  }

  logout(): void {
    this.authService.logout();
  }
}


