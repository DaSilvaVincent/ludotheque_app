import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {JeuxService} from "../services/jeux.service";
import {DataSource} from "@angular/cdk/collections";
import {Jeu} from "../../models/jeu";
import {ActivatedRoute} from "@angular/router";
import {Achats} from "../../models/achats";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-accueil',
  template: `
    <table mat-table [dataSource]="[datasource]" class="mat-elevation-z8">

      <!-- url_media Column -->
      <ng-container matColumnDef="url_media">
        <th mat-header-cell *matHeaderCellDef> image </th>
        <td mat-cell *matCellDef="let element"> {{this.datasource.jeu.url_media}} </td>
      </ng-container>

      <!-- nom Column -->
      <ng-container matColumnDef="nom">
        <th mat-header-cell *matHeaderCellDef> nom </th>
        <td mat-cell *matCellDef="let element"> {{this.datasource.jeu.nom}}</td>
      </ng-container>

      <!-- description Column -->
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> description </th>
        <td mat-cell *matCellDef="let element"> {{this.datasource.jeu.description}}</td>
      </ng-container>

      <!-- langue Column -->
      <ng-container matColumnDef="langue">
        <th mat-header-cell *matHeaderCellDef> langue </th>
        <td mat-cell *matCellDef="let element"> {{this.datasource.jeu.langue | slice:0:2}}</td>
      </ng-container>

      <!-- categorie Column -->
      <ng-container matColumnDef="categorie">
        <th mat-header-cell *matHeaderCellDef> categorie </th>
        <td mat-cell *matCellDef="let element"> {{this.datasource.jeu.categorie_id}}</td>
      </ng-container>

      <!-- theme Column -->
      <ng-container matColumnDef="theme">
        <th mat-header-cell *matHeaderCellDef> theme </th>
        <td mat-cell *matCellDef="let element"> {{this.datasource.jeu.theme_id}}</td>
      </ng-container>

      <!-- note Column -->
      <ng-container matColumnDef="note">
        <th mat-header-cell *matHeaderCellDef> note </th>
        <td mat-cell *matCellDef="let element"> {{noteMoy()}}</td>
      </ng-container>

      <!-- nb_likes Column -->
      <ng-container matColumnDef="nb_likes">
        <th mat-header-cell *matHeaderCellDef> nb_likes </th>
        <td mat-cell *matCellDef="let element"> {{this.datasource.nb_likes}}  </td>
      </ng-container>

      <!-- prixMoy Column -->
      <ng-container matColumnDef="prixMoy">
        <th mat-header-cell *matHeaderCellDef> prixMoy </th>
        <td mat-cell *matCellDef="let element"> {{prixMoy()}}  </td>
      </ng-container>

      <!-- La ligne -->
      <tr mat-header-row *matHeaderRowDef="lesColonnes"></tr>
      <tr mat-row *matRowDef="let row; columns: lesColonnes;"></tr>
    </table>
    <br>
    <table mat-table [dataSource]="this.datasource.commentaires" class="mat-elevation-z8">
      <!-- commentaires Column -->
      <ng-container matColumnDef="commentaires">
        <th mat-header-cell *matHeaderCellDef> commentaires </th>
        <td mat-cell *matCellDef="let element">{{element.commentaire}}</td>
      </ng-container>

      <!-- modifier Column -->
      <ng-container matColumnDef="modifier">
        <th mat-header-cell *matHeaderCellDef>modifier</th>
        <td mat-cell *matCellDef="let element">
          <mat-icon [routerLink]="['/modificationCommentaire', this.id, element.id]">loop</mat-icon>
        </td>
      </ng-container>

      <!-- supprimer Column -->
      <ng-container matColumnDef="supprimer">
        <th mat-header-cell *matHeaderCellDef>supprimer</th>
        <td mat-cell *matCellDef="let element">
          <mat-icon [routerLink]="['/suppressionCommentaire', this.id, element.id]">delete</mat-icon>
        </td>
      </ng-container>

      <!-- La ligne -->
      <tr mat-header-row *matHeaderRowDef="['commentaires','modifier','supprimer']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['commentaires','modifier','supprimer'];"></tr>
    </table>
    <br>
    <div class="button">
      <button mat-raised-button [routerLink]="['/listeJeu']" >Retour à la liste des jeux</button>
      <button mat-raised-button [routerLink]="['/creationCommentaires', this.id]" >Création d'un commentaires</button>
    </div>
  `,
  styles: [
    'table {width: 100%;border-collapse: collapse;font-family: Arial, sans-serif;}',
    'button {display: block; margin: auto;}'
  ]
})
export class DetailsJeuComponent implements OnInit {

  id: number = +(this.route.snapshot.paramMap.get('id') || 0);
  lesColonnes = ["url_media","nom","description","langue","categorie","theme","note","nb_likes","prixMoy"]
  le_jeu
  datasource = <Jeu>{}
  constructor(private route: ActivatedRoute, public jeuxService:JeuxService) {
    this.le_jeu = jeuxService.showJeu(this.id)
    this.le_jeu.subscribe(value => this.datasource = value)
  }

  ngOnInit(): void {
  }

  prixMoy() {
    let moy = 0
    this.datasource.achats.forEach(value => moy+=value.prix)
    return moy
  }

  noteMoy() {
    let moy = 0
    this.datasource.commentaires.forEach(value => moy+=value.note)
    return moy
  }

}
