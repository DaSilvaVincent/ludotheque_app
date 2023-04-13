import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable, tap } from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AdherentRequest} from "../../models/interface";
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import {CustomValidators} from "../services/customValidator";

@Component({
  selector: 'app-modification-profil',
  template: `<div>
    <mat-card>
      <mat-card-title>Modification Profil</mat-card-title>

      <mat-card-content>
        <form [formGroup]="updateForm" (ngSubmit)="update()" (reset)="annuler()">

          <mat-form-field>
            <input type="text" matInput placeholder="Nom" formControlName="nom">
            <mat-error
              *ngIf="nom?.touched && nom?.hasError('required')">
              Le nom est obligatoire
            </mat-error>
            <mat-error
              *ngIf="nom?.hasError('minlength') || nom?.hasError('maxlength')">
              Le nom doit etre compris entre 5 et 50 caracteres
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <input type="text" matInput placeholder="Prenom" formControlName="prenom">
            <mat-error
              *ngIf="prenom?.touched && prenom?.hasError('required')">
              Le prenom est obligatoire
            </mat-error>
            <mat-error
              *ngIf="prenom?.hasError('minlength') || prenom?.hasError('maxlength')">
              Le prenom doit etre compris entre 5 et 50 caracteres
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <input type="text" matInput placeholder="Login" formControlName="login">
            <mat-error
              *ngIf="login?.touched && login?.hasError('required')">
              Le login est obligatoire
            </mat-error>
            <mat-error
              *ngIf="login?.hasError('minlength') || login?.hasError('maxlength')">
              Le login doit etre compris entre 5 et 50 caracteres
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <input type="text" matInput placeholder="Pseudo" formControlName="pseudo">
            <mat-error
              *ngIf="pseudo?.touched && pseudo?.hasError('required')">
              Le pseudo est obligatoire
            </mat-error>
            <mat-error
              *ngIf="pseudo?.hasError('minlength') || pseudo?.hasError('maxlength')">
              Le pseudo doit etre compris entre 5 et 50 caracteres
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <input type="text" matInput placeholder="Email" formControlName="email">
            <mat-error
              *ngIf="email?.touched && email?.hasError('required')">
              L'email est obligatoire
            </mat-error>
            <mat-error *ngIf="email?.touched && email?.hasError('email')">
              Doit être une adresse mail valide
            </mat-error>
            <mat-error
              *ngIf="email?.hasError('minlength') || email?.hasError('maxlength')">
              L'email doit etre compris entre 5 et 50 caracteres
            </mat-error>
            <mat-error
              *ngIf="email?.hasError('unique')">
              L'email doit etre unique
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <input type="password" matInput placeholder="Password" formControlName="password" value="{{this.infosUser.password}}">
            <mat-error
              *ngIf="password?.touched && password?.hasError('required')">
              Le mot de passe est obligatoire
            </mat-error>
            <mat-error
              *ngIf="password?.hasError('minlength') || password?.hasError('maxlength')">
              Le mot de passe doit etre compris entre 5 et 50 caracteres
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <input type="password" matInput placeholder="Confirm password" formControlName="passwordConfirm">
            <mat-error
              *ngIf="updateForm.hasError('required', 'passwordConfirm')">
              La confirmation du mot de passe est obligatoire
            </mat-error>
            <mat-error
              *ngIf="updateForm.hasError('minlength', 'passwordConfirm') || updateForm.hasError('maxlength', 'passwordConfirm')">
              La confirmation du mot de passe doit etre compris entre 5 et 50 caracteres
            </mat-error>
          </mat-form-field>

          <mat-error
            *ngIf="passwordConfirm?.dirty && updateForm.hasError('passwordsNotMatching')">
            Les mots de passe saisis ne sont pas identiques !
          </mat-error>

          <div class="button">
            <button type="reset" mat-button>Annuler</button>
            <!-- Button is disabled(not clickable), if our updateForm contains Validation Errors -->
            <button type="submit" mat-button [disabled]="!updateForm.valid">Modification</button>
          </div>

        </form>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styles: [':host { display: flex; justify-content: center; margin: 100px 0;}',
    'p { display: flex; justify-content: center; margin: 100px 0; font-size: 32px;}',
    'mat-card {  max-width: 600px;}',
    'mat-card-title, mat-card-content { display: flex; justify-content: center;}',
    'mat-form-field { width: 100%; min-width: 300px; }',
    '.error {padding: 16px;width: 300px;color: white;background-color: red;}',
    '.button { display: flex; justify-content: flex-end;}'
  ]
})
export class ModificationProfilComponent implements OnInit {
  id: number = +(this.route.snapshot.paramMap.get('id') || 0);

  infosUser = <AdherentRequest>{};
  le_profil:Observable<AdherentRequest>;
  updateForm = <FormGroup>{};

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.le_profil = this.userService.getProfil(this.id)
    this.le_profil .subscribe(value => {
      this.updateForm = new FormGroup({
        nom: new FormControl(value.nom, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
        prenom: new FormControl(value.prenom, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
        login: new FormControl(value.login, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
        pseudo: new FormControl(value.pseudo, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
        email: new FormControl(value.email, [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50), RxwebValidators.unique()]),
        password: new FormControl(value.password, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
        passwordConfirm: new FormControl(undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
        },
        {validators: CustomValidators.passwordsMatching}
      )
    })
  }

  ngOnInit(): void {
  }

  update() {
    if (!this.updateForm.valid) {
      return;
    }
    this.userService.updateProfil(<AdherentRequest><unknown>{...this.updateForm.value}).pipe(
      tap(() => this.router.navigate(['accueil']))
    ).subscribe();
  }

  annuler() {
    this.router.navigate(['accueil'])
  }

  get nom() {
    return this.updateForm.get('nom');
  }
  get prenom() {
    return this.updateForm.get('prenom');
  }
  get login() {
    return this.updateForm.get('login');
  }
  get pseudo() {
    return this.updateForm.get('pseudo');
  }
  get email() {
    return this.updateForm.get('email');
  }
  get password() {
    return this.updateForm.get('password');
  }

  get passwordConfirm(){
    return this.updateForm.get('passwordConfirm');
  }
}
