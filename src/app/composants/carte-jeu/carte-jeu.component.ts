import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Jeu} from '../../../models/jeu';
import {JeuxService} from '../../services/jeux.service';
import {ActivatedRoute} from "@angular/router";
import {DataSourceAsynchro} from "../tableau-jeu/tableau-jeu.component";

@Component({
  selector: 'app-carte-jeu',
  template: `
    <div class="card" *ngFor="let jeu of jeux$ | async">
      <mat-card class="card">
        <mat-card-header>
          <div mat-card-avatar class="header-image"></div>
          <mat-card-title>{{ jeu.nom }}</mat-card-title>
          <mat-card-subtitle>Langue: {{jeu.langue | slice:0:2 }}</mat-card-subtitle>
        </mat-card-header>
        <img mat-card-lg-image [src]="jeu.url_media" [alt]="jeu.nom">
        <mat-card-content>
          <br>
          <span class="categorie"> Catégorie: {{jeu.categorie_id}}</span>
        </mat-card-content>
        <span class="theme"> Thème: {{jeu.theme_id}}</span>
        <span class="like"> likes: {{le_jeu}}</span>

      </mat-card>
    </div>

  `,
  styles: [
    `.card {
      display: inline-block;
      vertical-align: top;
      margin-left: 45px;
      margin-top: 20px;
    }
    `,
  ],
})
export class CarteJeuComponent implements OnInit {
  jeux$: Observable<Jeu[]> | undefined;
  le_jeu: Observable<Jeu[]> | undefined;
  id: number = +(this.route.snapshot.paramMap.get('id') || 0);

  dataSource: DataSourceAsynchro = new DataSourceAsynchro(this.jeuxService)
  private jeuxSubject = new BehaviorSubject<Jeu[]>([]);

  constructor(private jeuxService: JeuxService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.jeux$= this.jeuxService.getJeux('asc', 2);
    this.dataSource.setNbLike();
    this.le_jeu= this.jeuxService.nblike(this.id);
  }

}
