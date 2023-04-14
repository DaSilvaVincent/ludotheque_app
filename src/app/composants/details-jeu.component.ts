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
        <td mat-cell *matCellDef="let element"><img src="http://localhost:8000/storage/public/{{datasource.jeu.url_media}}"></td>
      </ng-container>

      <!-- nom Column -->
      <ng-container matColumnDef="nom">
        <th mat-header-cell *matHeaderCellDef> nom </th>
        <td mat-cell *matCellDef="let element"> {{datasource.jeu.nom}}</td>
      </ng-container>

      <!-- description Column -->
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> description </th>
        <td mat-cell *matCellDef="let element"> {{datasource.jeu.description}}</td>
      </ng-container>

      <!-- langue Column -->
      <ng-container matColumnDef="langue">
        <th mat-header-cell *matHeaderCellDef> langue </th>
        <td mat-cell *matCellDef="let element"> {{datasource.jeu.langue | slice:0:2}}</td>
      </ng-container>

      <!-- categorie Column -->
      <ng-container matColumnDef="categorie">
        <th mat-header-cell *matHeaderCellDef> categorie </th>
        <td mat-cell *matCellDef="let element"> {{datasource.jeu.categorie_id}}</td>
      </ng-container>

      <!-- theme Column -->
      <ng-container matColumnDef="theme">
        <th mat-header-cell *matHeaderCellDef> theme </th>
        <td mat-cell *matCellDef="let element"> {{datasource.jeu.theme_id}}</td>
      </ng-container>

      <!-- note Column -->
      <ng-container matColumnDef="note">
        <th mat-header-cell *matHeaderCellDef> note </th>
        <td mat-cell *matCellDef="let element"> {{noteMoy()}}</td>
      </ng-container>

      <!-- nb_likes Column -->
      <ng-container matColumnDef="nb_likes">
        <th mat-header-cell *matHeaderCellDef> nb_likes </th>
        <td mat-cell *matCellDef="let element"> {{datasource.nb_likes}}  </td>
      </ng-container>

      <!-- prixMoy Column -->
      <ng-container matColumnDef="prixMoy">
        <th mat-header-cell *matHeaderCellDef> prixMoy </th>
        <td mat-cell *matCellDef="let element"> {{prixMoy()}}  </td>
      </ng-container>

      <!-- commentaires Column -->
      <ng-container matColumnDef="commentaires">
        <th mat-header-cell *matHeaderCellDef> commentaires </th>
        <td mat-cell *matCellDef="let element"> {{lesCommentaires()}} </td>
      </ng-container>

      <!-- La ligne -->
      <tr mat-header-row *matHeaderRowDef="lesColonnes"></tr>
      <tr mat-row *matRowDef="let row; columns: lesColonnes;"></tr>
    </table>
    <button mat-raised-button [routerLink]="['/gestionCommentaires', this.id]" >Gestion des commentaires</button>
  `,
  styles: [
    'table {width: 100%;border-collapse: collapse;font-family: Arial, sans-serif;}',
    'button {display: block; margin: auto;}'
  ]
})
export class DetailsJeuComponent implements OnInit {

  id: number = +(this.route.snapshot.paramMap.get('id') || 0);
  lesColonnes = ["url_media","nom","description","langue","categorie","theme","note","nb_likes","prixMoy","commentaires"]
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

  lesCommentaires() {
    let coms:string[] = []
    this.datasource.commentaires.forEach(value => coms.push(value.commentaire+" "))
    return coms
  }
}
