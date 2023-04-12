import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {JeuxService} from "../../services/jeux.service";
import {DataSource} from "@angular/cdk/collections";
import {Jeu} from "../../../models/jeu";

@Component({
  selector: 'app-tableau-jeu',
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <!-- nom Column -->
      <ng-container matColumnDef="nom">
        <th mat-header-cell *matHeaderCellDef> nom </th>
        <td mat-cell *matCellDef="let element"> {{element.nom}} </td>
      </ng-container>

      <!-- description Column -->
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> description </th>
        <td mat-cell *matCellDef="let element"> {{element.description}}</td>
      </ng-container>

      <!-- langue Column -->
      <ng-container matColumnDef="langue">
        <th mat-header-cell *matHeaderCellDef> Langue </th>
        <td mat-cell *matCellDef="let element">{{ element.langue | slice:0:2 }}</td>
      </ng-container>

      <!-- categorie id Column -->
      <ng-container matColumnDef="categorie_id">
        <th mat-header-cell *matHeaderCellDef> categorie_id </th>
        <td mat-cell *matCellDef="let element"> {{element.categorie_id}}  </td>
      </ng-container>

      <!-- theme id Column -->
      <ng-container matColumnDef="theme_id">
        <th mat-header-cell *matHeaderCellDef> theme_id </th>
        <td mat-cell *matCellDef="let element"> {{element.theme_id}}  </td>
      </ng-container>

      <!-- modification Column -->
      <ng-container matColumnDef="modification">
        <th mat-header-cell *matHeaderCellDef>modification</th>
        <td mat-cell *matCellDef="let element">
          <mat-icon [routerLink]="['/modificationJeu', element.id]">loop</mat-icon>
        </td>
      </ng-container>

      <!-- modif url_media Column -->
      <ng-container matColumnDef="modif url_media">
        <th mat-header-cell *matHeaderCellDef>url_media</th>
        <td mat-cell *matCellDef="let element">
          <mat-icon [routerLink]="['/imageUpload', element.id]">add_photo_alternate</mat-icon>
        </td>
      </ng-container>

      <!-- La ligne -->
      <tr mat-header-row *matHeaderRowDef="lesColonnes"></tr>
      <tr mat-row *matRowDef="let row; columns: lesColonnes;"></tr>
    </table>


  `,
  styleUrls: ['./tableau-jeu.component.css']
})
export class TableauJeuComponent implements OnInit {

  les_jeux: Jeu [] = [];
  lesColonnes = ["nom","description","langue","categorie_id","theme_id","modification","modif url_media"]
  dataSource: DataSourceAsynchro = new DataSourceAsynchro(this.jeuxService)

  constructor(public jeuxService:JeuxService) {
  }

  ngOnInit(): void {
    this.dataSource = new DataSourceAsynchro(this.jeuxService)
    this.dataSource.setData();
  }

}

class DataSourceAsynchro extends DataSource<Jeu> {
  private jeuxSubject = new BehaviorSubject<Jeu[]>([]);

  constructor(private jeuxService: JeuxService) {
    super();
  }

  connect(): Observable<Jeu[]> {
    return this.jeuxSubject.asObservable();
  }

  disconnect() {
    this.jeuxSubject.complete();
  }

  setData() {
    this.jeuxService.getJeux('asc',2).subscribe(jeux => {
      this.jeuxSubject.next(jeux)
    });
 }
}


