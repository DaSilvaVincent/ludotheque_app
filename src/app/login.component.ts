import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  template: `
    <div>
      <a [routerLink]="['../register']">Création d'un compte</a>
      <mat-card>
        <mat-card-title>Connexion</mat-card-title>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="login()">
            <mat-form-field>
              <input type="email" matInput placeholder="Email" formControlName="email">
              <mat-error
                *ngIf="email?.touched && email?.hasError('required')">
                L'adresse mail est obligatoire
              </mat-error>
              <mat-error *ngIf="email?.touched && email?.hasError('email')">
                Doit être une adresse mail valide
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <input type="password" matInput placeholder="Password" formControlName="password">
              <mat-error
                *ngIf="password?.touched && password?.hasError('required')">
                Le mot de passe est obligatoire
              </mat-error>
            </mat-form-field>

            <div class="button">
              <button type="submit" mat-button [disabled]="!form.valid">Connexion</button>
            </div>

          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    ':host { display: flex; justify-content: center; margin: 100px 0px;}',
    'mat-card {  max-width: 600px;}',
    'mat-card-title, mat-card-content { display: flex; justify-content: center;}',
    'mat-form-field { width: 100%; min-width: 300px; }',
    '.error {padding: 16px;width: 300px;color: white;background-color: red;}',
    '.button { display: flex; justify-content: flex-end;}'
  ]
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private authService: AuthService,
              private router: Router) {
  }

  login() {
    if (!this.form.valid) {
      return;
    }
    this.authService.login(this.email?.value, this.password?.value).pipe(
      tap(() => this.router.navigate(['dashboard']))
    ).subscribe();
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
