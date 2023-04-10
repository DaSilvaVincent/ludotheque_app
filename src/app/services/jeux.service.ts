import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, shareReplay} from "rxjs";
import {Jeu} from "../../models/jeu";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";
import {JeuRequest} from "../../models/JeuRequest";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(private http: HttpClient, private authService: AuthService,private snackbar: MatSnackBar) { }

  getJeux():
    Observable<Jeu[]> {
    const url = 'http://127.0.0.1:8000/api/jeu/indexVisiteur';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.authService.userValue.jwtToken})
    };
    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.jeux),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }

  createJeu(request: JeuRequest): Observable<Jeu> {
    return this.http.post<any>(`${environment.apiUrl}/jeu/createJeu`, {
      nom: request.nom,
      description: request.description,
      langue: request.langue,
      age_min: request.age_min,
      nombre_joueurs_min: request.nombre_joueurs_min,
      nombre_joueurs_max: request.nombre_joueurs_max,
      duree_partie: request.duree_partie,
      categorie_id: request.categorie_id,
      theme_id: request.theme_id,
      editeur_id: request.editeur_id
    }, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).pipe(
      map(rep => {
        const jeu = {...rep.jeu};
        this.snackbar.open(`Creation du jeu avec succes`, 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        return jeu;
      }),
      shareReplay(),
      catchError(err => {
        console.log(err);
        this.snackbar.open(`Creation du jeu invalide ${err.error.message}` , 'Close', {
          duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        throw new Error(`register result : ${err}`)
      })
    )
  }
}
