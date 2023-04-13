import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Jeu} from '../../../models/jeu';
import {JeuxService} from '../../services/jeux.service';
import {ActivatedRoute} from "@angular/router";
import {DataSourceAsynchro} from "../tableau-jeu/tableau-jeu.component";

@Component({
  selector: 'app-carte-jeu',
  template: `
    <div class="card" *ngFor="let jeu of jeux">
      <mat-card class="card">
        <mat-card-header>
          <div mat-card-avatar class="header-image"></div>
          <mat-card-title>{{ jeu.jeu.nom }}</mat-card-title>
          <mat-card-subtitle>Langue: {{jeu.jeu.langue | slice:0:2 }}</mat-card-subtitle>
        </mat-card-header>
        <img mat-card-lg-image [src]="jeu.jeu.url_media" [alt]="jeu.jeu.nom">
        <mat-card-content>
          <br>
          <span class="categorie"> Catégorie: {{jeu.jeu.categorie_id}}</span>
          <br>
          <span class="theme"> Thème: {{jeu.jeu.theme_id}}</span>
          <br>
          <span class="like"> likes: {{jeu.nb_likes}}</span>
        </mat-card-content>
      </mat-card>
    </div>
    <button (click)="test()">TEST</button>
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
  le_jeu: Observable<Jeu[]> = <Observable<Jeu[]>>{};
  id: number = +(this.route.snapshot.paramMap.get('id') || 0);
  private jeuxSubject = new BehaviorSubject<Jeu>(<Jeu>{});
  jeux:Jeu[] = []

  constructor(private jeuxService: JeuxService,private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.jeux$ = this.jeuxService.getJeux('asc', 2);
    this.le_jeu = this.jeuxService.nblike(this.id);
    this.jeux$.subscribe(jeux => {
      jeux.forEach(value => {
        this.jeuxService.showJeu(value.id).subscribe(value2 => {
          this.jeuxSubject.next(value2);
          this.jeux.push(this.jeuxSubject.value)
        });
      });
    });
  }

  nombreLikes(id:number) {
    this.le_jeu= this.jeuxService.nblike(id);

  }

  test() {
    console.log(this.jeux)
  }
}
