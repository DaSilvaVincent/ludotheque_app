import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {JeuxService} from "../../services/jeux.service";
import {DataSource} from "@angular/cdk/collections";
import {Jeu} from "../../../models/jeu";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tableau-jeu',
  template: `
    <div>
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

        <!-- details Column -->
        <ng-container matColumnDef="details">
          <th mat-header-cell *matHeaderCellDef>details</th>
          <td mat-cell *matCellDef="let element">
            <mat-icon [routerLink]="['/detailsJeu', element.id]">loupe</mat-icon>
          </td>
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
      <mat-card>
        <mat-card-title>Filtrage</mat-card-title>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="leTri()">
            <mat-form-field>
              <input type="number" matInput placeholder="Age minimum" formControlName="age_min">
              <mat-error
                *ngIf="age_min?.touched && age_min?.hasError('required')">
                L'adresse mail est obligatoire
              </mat-error>
              <mat-error
                *ngIf="age_min?.hasError('min') || age_min?.hasError('max')">
                L'age minimum doit etre compris entre 0 et 18
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <input type="number" matInput placeholder="nombre de joueurs minimum" formControlName="nombre_joueurs_min">
              <mat-error
                *ngIf="nombre_joueurs_min?.touched && nombre_joueurs_min?.hasError('required')">
                Le mot de passe est obligatoire
              </mat-error>
              <mat-error
                *ngIf="nombre_joueurs_min?.hasError('min') || nombre_joueurs_min?.hasError('max')">
                Le nombre de joueurs minimum doit etre compris entre 0 et 4
              </mat-error>
            </mat-form-field>
          </form>
          <button mat-raised-button (click)="leTri()">Tri</button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./tableau-jeu.component.css']
})
export class TableauJeuComponent implements OnInit {

  les_jeux: Jeu [] = [];
  lesColonnes = ["nom","description","langue","categorie_id","theme_id","details","modification","modif url_media"]
  dataSource: DataSourceAsynchro = new DataSourceAsynchro(this.jeuxService)
  cpt = 0

  form: FormGroup = new FormGroup({
    age_min: new FormControl(null, [Validators.min(0), Validators.max(18)]),
    nombre_joueurs_min: new FormControl(null,[Validators.min(0), Validators.max(4)]),
  });
  constructor(public jeuxService:JeuxService) {
  }

  ngOnInit(): void {
    this.dataSource = new DataSourceAsynchro(this.jeuxService)
    this.dataSource.setData();
  }

  leTri() {
    let age = this.age_min?.value
    let nb_j = this.nombre_joueurs_min?.value
    if (age == null) {
      age = 0
    }
    if (nb_j == null) {
      nb_j = 0
    }
    if (this.cpt==0) {
      this.dataSource.setData("desc", age, nb_j);
      this.cpt = 1
    }
    else {
      this.dataSource.setData("asc", age, nb_j)
      this.cpt = 0
    }
  }


  get age_min() {
    return this.form.get('age_min')
  }

  get nombre_joueurs_min() {
    return this.form.get('nombre_joueurs_min')
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

  setData(sort: string = 'asc', age_min: number = 0, nb_joueur_min: number = 0) {
    this.jeuxService.getJeux(sort, age_min, nb_joueur_min).subscribe(jeux => {
      this.jeuxSubject.next(jeux)
    });
  }

}


