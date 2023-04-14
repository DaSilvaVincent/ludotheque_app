import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {tap} from "rxjs";
import {JeuxService} from "../services/jeux.service";
import {JeuRequest} from "../../models/JeuRequest";

@Component({
  selector: 'app-creation-jeu',
  template: `
    <div>
      <mat-card>
        <mat-card-title>Creation Jeu</mat-card-title>

        <mat-card-content>
          <form [formGroup]="creationForm" (ngSubmit)="create()">

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
              <input type="text" matInput placeholder="Description" formControlName="description">
              <mat-error
                *ngIf="description?.touched && description?.hasError('required')">
                La description est obligatoire
              </mat-error>
              <mat-error
                *ngIf="description?.hasError('minlength') || description?.hasError('maxlength')">
                La description doit etre compris entre 5 et 500 caracteres
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <input type="text" matInput placeholder="Langue" formControlName="langue">
              <mat-error
                *ngIf="langue?.touched && langue?.hasError('required')">
                La langue est obligatoire
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <input type="int" matInput placeholder="Age minimum" formControlName="age_min">
              <mat-error
                *ngIf="age_min?.touched && age_min?.hasError('required')">
                L'age minimum est obligatoire
              </mat-error>
              <mat-error
                *ngIf="age_min?.hasError('min') || age_min?.hasError('max')">
                L'age minimum doit etre compris entre 4 et 18
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <input type="int" matInput placeholder="Nombre de joueurs minimum" formControlName="nombre_joueurs_min">
              <mat-error
                *ngIf="nombre_joueurs_min?.touched && nombre_joueurs_min?.hasError('required')">
                Le nombre de joueurs minimum est obligatoire
              </mat-error>
              <mat-error
                *ngIf="nombre_joueurs_min?.hasError('min') || nombre_joueurs_min?.hasError('max')">
                Le nombre de joueurs minimum doit etre compris entre 1 et 4
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <input type="int" matInput placeholder="Nombre de joueurs maximum" formControlName="nombre_joueurs_max">
              <mat-error
                *ngIf="nombre_joueurs_max?.touched && nombre_joueurs_max?.hasError('required')">
                Le nombre de joueurs maximum est obligatoire
              </mat-error>
              <mat-error
                *ngIf="nombre_joueurs_max?.hasError('min') || nombre_joueurs_max?.hasError('max')">
                Le nombre de joueurs maximum doit etre compris entre 5 et 8
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <input type="text" matInput placeholder="duree d'une partie" formControlName="duree_partie">
              <mat-error
                *ngIf="duree_partie?.touched && duree_partie?.hasError('required')">
                La duree d'une partie est obligatoire
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <input type="int" matInput placeholder="l'identifiant de la categorie du jeu" formControlName="categorie_id">
              <mat-error
                *ngIf="categorie_id?.touched && categorie_id?.hasError('required')">
                L'identifiant de la categorie du jeu est obligatoire
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <input type="int" matInput placeholder="l'identifiant du theme du jeu" formControlName="theme_id">
              <mat-error
                *ngIf="theme_id?.touched && theme_id?.hasError('required')">
                L'identifiant du theme du jeu est obligatoire
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <input type="int" matInput placeholder="l'identifiant de l'editeur du jeu" formControlName="editeur_id">
              <mat-error
                *ngIf="editeur_id?.touched && editeur_id?.hasError('required')">
                L'identifiant de l'editeur du jeu est obligatoire
              </mat-error>
            </mat-form-field>

            <div class="button">
              <!-- Button is disabled(not clickable), if our RegisterForm contains Validation Errors -->
              <button type="submit" mat-button [disabled]="!creationForm.valid">Creation</button>
            </div>

          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    ':host { display: flex; justify-content: center; margin: 100px 0;}',
    'mat-card {  max-width: 600px;}',
    'mat-card-title, mat-card-content { display: flex; justify-content: center;}',
    'mat-form-field { width: 100%; min-width: 300px; }',
    '.error {padding: 16px;width: 300px;color: white;background-color: red;}',
    '.button { display: flex; justify-content: flex-end;}'
  ]
})
export class CreationJeuComponent implements OnInit{
  creationForm = new FormGroup({
      nom: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      langue: new FormControl('', [Validators.required]),
      age_min: new FormControl('', [Validators.required, Validators.min(4), Validators.max(18)]),
      nombre_joueurs_min: new FormControl('', [Validators.required, Validators.min(1), Validators.max(4)]),
      nombre_joueurs_max: new FormControl('', [Validators.required, Validators.min(5), Validators.max(8)]),
      duree_partie: new FormControl('', [Validators.required]),
      categorie_id: new FormControl('', [Validators.required]),
      theme_id: new FormControl('', [Validators.required]),
      editeur_id: new FormControl('', [Validators.required])
    },
  )

  constructor(private router: Router,private jeuService: JeuxService) {
  }

  ngOnInit(): void {
  }

  create() {
    if (!this.creationForm.valid) {
      return;
    }
    this.jeuService.createJeu(<JeuRequest><unknown>{...this.creationForm.value}).pipe(
      tap(() => this.router.navigate(['listeJeu']))
    ).subscribe();
  }

  get nom() {
    return this.creationForm.get('nom');
  }
  get description() {
    return this.creationForm.get('description');
  }
  get langue() {
    return this.creationForm.get('langue');
  }
  get age_min() {
    return this.creationForm.get('age_min');
  }
  get nombre_joueurs_min() {
    return this.creationForm.get('nombre_joueurs_min');
  }
  get nombre_joueurs_max() {
    return this.creationForm.get('nombre_joueurs_max');
  }
  get duree_partie() {
    return this.creationForm.get('duree_partie');
  }
  get categorie_id() {
    return this.creationForm.get('categorie_id');
  }
  get theme_id() {
    return this.creationForm.get('categorie_id');
  }
  get editeur_id() {
    return this.creationForm.get('categorie_id');
  }

}
