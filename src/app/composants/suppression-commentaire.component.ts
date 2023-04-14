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
  selector: 'app-suppression-commentaire',
  template: `
    <div>
      <mat-card>
        <mat-card-title>Suppression Commentaire</mat-card-title>

        <mat-card-content>

            <div class="button">
              <button mat-button (click)="annuler()">Annuler la suppression</button>
              <button mat-button (click)="supprimer()">Valider la suppression</button>
            </div>


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
export class SuppressionCommentaireComponent implements OnInit{

  idJ: number = +(this.route.snapshot.paramMap.get('idJ') || 0);
  idC: number = +(this.route.snapshot.paramMap.get('idC') || 0);


  constructor(private route: ActivatedRoute,private router: Router,private commentairesService: CommentairesService, private jeuService:JeuxService, private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  supprimer() {
    this.commentairesService.delCommentaire(this.idC).pipe(
      tap(() => this.router.navigate(['detailsJeu',this.idJ]))
    ).subscribe()
  }

  annuler() {
    this.router.navigate(['detailsJeu',this.idJ])
  }

}
