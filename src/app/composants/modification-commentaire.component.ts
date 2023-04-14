import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JeuxService} from "../services/jeux.service";
import {JeuRequest} from "../../models/JeuRequest";
import {BehaviorSubject, Observable, Subscription, tap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Jeu} from "../../models/jeu";
import {DataSource} from "@angular/cdk/collections";
import {CommentairesService} from "../services/commentaires.service";
import {Commentaires} from "../../models/commentaires";
import {AuthService} from "../services/auth.service";
import {CommentairesRequest} from "../../models/CommentairesRequest";

@Component({
  selector: 'app-modification-commentaire',
  template: `
    <div>
      <mat-card>
        <mat-card-title>Modification Commentaire</mat-card-title>

        <mat-card-content>
          <form [formGroup]="updateForm" (ngSubmit)="update()" (reset)="annuler()">

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
              <!-- Button is disabled(not clickable), if our updateForm contains Validation Errors -->
              <button type="submit" mat-button [disabled]="!updateForm.valid">Modification</button>
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
export class ModificationCommentaireComponent implements OnInit{

  idJ: number = +(this.route.snapshot.paramMap.get('idJ') || 0);
  idC: number = +(this.route.snapshot.paramMap.get('idC') || 0);
  le_jeu
  les_commentaires:Commentaires[] = []
  updateForm = <FormGroup>{}

  constructor(private route: ActivatedRoute,private router: Router,private commentairesService: CommentairesService, private jeuService:JeuxService, private authService: AuthService) {
    this.le_jeu = this.jeuService.showJeu(this.idJ)


  }

  ngOnInit(): void {
    this.le_jeu.subscribe(value => {
      value.commentaires.forEach(commentaire => {
        if (commentaire.id == this.idC)
          this.updateForm = new FormGroup({
            commentaire: new FormControl(commentaire.commentaire, [Validators.required]),
            date_com: new FormControl(Date.now()),
            note: new FormControl(commentaire.note,[Validators.required, Validators.min(0), Validators.max(5)]),
            jeu_id: new FormControl(this.idJ),
            user_id: new FormControl(commentaire.user_id),
          })
      })
    })
  }

  update() {
    if (!this.updateForm.valid) {
      return;
    }
    this.commentairesService.updateCommentaire(<CommentairesRequest>{...this.updateForm.value},this.idC).pipe(
      tap(() => this.router.navigate(['detailsJeu',this.idJ]))
    ).subscribe();
  }

  annuler() {
    this.router.navigate(['detailsJeu',this.idJ])
  }

  get commentaire() {
    return this.updateForm.get('commentaire')
  }

  get note() {
    return this.updateForm.get('note')
  }
}
