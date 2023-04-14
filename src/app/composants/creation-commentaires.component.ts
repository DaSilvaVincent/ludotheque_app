import {Component, OnInit} from '@angular/core';
import {CommentairesService} from "../services/commentaires.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Commentaires} from "../../models/commentaires";
import {tap} from "rxjs";

@Component({
  selector: 'app-gestion-commentaires',
  template: `
    <mat-card>
      <mat-card-title>Commentaire</mat-card-title>
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="creation()" (reset)="annuler()">
          <mat-form-field>
            <input type="text" matInput placeholder="Le commentaire" formControlName="commentaire">
            <mat-error
              *ngIf="commentaire?.touched && commentaire?.hasError('required')">
              Le commentaire est obligatoire
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <input type="number" matInput placeholder="La note du jeu sur 5" formControlName="note">
            <mat-error
              *ngIf="note?.touched && note?.hasError('required')">
              La note est obligatoire
            </mat-error>
            <mat-error
              *ngIf="note?.hasError('min') || note?.hasError('max')">
              La note doit etre compris entre 0 et 5
            </mat-error>
          </mat-form-field>
          <div class="button">
            <button type="reset" mat-button>Annuler</button>

            <button type="submit" mat-button [disabled]="!form.valid">Creation</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [

  ]
})
export class CreationCommentairesComponent implements OnInit {

  id: number = +(this.route.snapshot.paramMap.get('id') || 0);

  form: FormGroup = new FormGroup({
    commentaire: new FormControl(null, [Validators.required]),
    date_com: new FormControl(Date.now()),
    note: new FormControl(null,[Validators.required, Validators.min(0), Validators.max(5)]),
    jeu_id: new FormControl(this.id),
    user_id: new FormControl(this.authService.userValue.id),
  });

  constructor(private route: ActivatedRoute, private router: Router, public commentaireService:CommentairesService,private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  get commentaire() {
    return this.form.get('commentaire')
  }

  get note() {
    return this.form.get('note')
  }

  creation() {
    if (!this.form.valid) {
      return;
    }
    this.commentaireService.createCommentaire(<Commentaires>{...this.form.value}).pipe(
      tap(() => this.router.navigate(['detailsJeu',this.id]))
    ).subscribe();
  }

  annuler() {
    this.router.navigate(['detailsJeu',this.id])
  }
}

