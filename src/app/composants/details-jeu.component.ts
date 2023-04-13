import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {JeuxService} from "../services/jeux.service";
import {DataSource} from "@angular/cdk/collections";
import {Jeu} from "../../models/jeu";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-accueil',
  template: `
    <table mat-table [dataSource]="[le_jeu]" class="mat-elevation-z8">

      <!-- id Column -->
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> id </th>
        <td mat-cell *matCellDef="let element"> {{element[0].id}} </td>
      </ng-container>

      <!-- nom Column -->
      <ng-container matColumnDef="nom">
        <th mat-header-cell *matHeaderCellDef> nom </th>
        <td mat-cell *matCellDef="let element"> {{element[0].nom}}</td>
      </ng-container>

      <!-- description Column -->
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> description </th>
        <td mat-cell *matCellDef="let element"> {{element[0].description}}</td>
      </ng-container>

      <!-- langue Column -->
      <ng-container matColumnDef="langue">
        <th mat-header-cell *matHeaderCellDef> langue </th>
        <td mat-cell *matCellDef="let element"> {{element[0].langue}}</td>
      </ng-container>

      <!-- age_min Column -->
      <ng-container matColumnDef="age_min">
        <th mat-header-cell *matHeaderCellDef> age_min </th>
        <td mat-cell *matCellDef="let element"> {{element[0].age_min}}</td>
      </ng-container>

      <!-- nb_joueurs_min Column -->
      <ng-container matColumnDef="nb_joueurs_min">
        <th mat-header-cell *matHeaderCellDef> nb_joueurs_min </th>
        <td mat-cell *matCellDef="let element"> {{element[0].nombre_joueurs_min}}</td>
      </ng-container>

      <!-- nb_joueurs_max Column -->
      <ng-container matColumnDef="nb_joueurs_max">
        <th mat-header-cell *matHeaderCellDef> nb_joueurs_max </th>
        <td mat-cell *matCellDef="let element"> {{element[0].nombre_joueurs_max}}</td>
      </ng-container>

      <!-- duree_partie Column -->
      <ng-container matColumnDef="duree_partie">
        <th mat-header-cell *matHeaderCellDef> duree_partie </th>
        <td mat-cell *matCellDef="let element"> {{element[0].duree_partie}}  </td>
      </ng-container>

      <!-- La ligne -->
      <tr mat-header-row *matHeaderRowDef="lesColonnes"></tr>
      <tr mat-row *matRowDef="let row; columns: lesColonnes;"></tr>
    </table>

  `,
  styles: [
    ':host { display: flex; justify-content: center; margin: 100px 0;}',
  ]
})
export class DetailsJeuComponent implements OnInit {

  id: number = +(this.route.snapshot.paramMap.get('id') || 0);
  lesColonnes = ["nom","description","langue","categorie_id","theme_id","details","modification","modif url_media"]

  le_jeu
  constructor(private route: ActivatedRoute, public jeuxService:JeuxService) {
    this.le_jeu = jeuxService.getJeu(this.id)
    this.le_jeu.subscribe(value => console.log(value))
  }

  ngOnInit(): void {
  }

}
