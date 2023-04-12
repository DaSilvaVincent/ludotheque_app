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
    const url = `${environment.apiUrl}/jeu/indexVisiteur`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
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

  getJeu(id: number):
    Observable<Jeu> {
    const url = `${environment.apiUrl}/jeu/showJeu/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Accept': 'application/json'
        })
    };
    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.jeu),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of();
        }),
      );
  }

  updateJeu(request: JeuRequest,id: number): Observable<Jeu[]> {
    return this.http.put<any>(`${environment.apiUrl}/jeu/updateJeu/${id}`,{
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
      },{
        headers: new HttpHeaders({'Content-Type': 'application/json',
          'Accept': 'application/json'
          })
      })
      .pipe(
        map(rep => {
          const jeu = {...rep.jeu};
          this.snackbar.open(`Modification du jeu avec succes`, 'Close', {
            duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          return jeu;
        }),
        shareReplay(),
        catchError(err => {
          console.log(err);
          this.snackbar.open(`Modification du jeu invalide ${err.error.message}` , 'Close', {
            duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          throw new Error(`update result : ${err}`)
        })
      )
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
        throw new Error(`create result : ${err}`)
      })
    )
  }

  uploadMedia(url_media: string, id: number) {
    return this.http.put<any>(`${environment.apiUrl}/jeu/updateUrl/${id}`,{
      url_media: url_media
    },{
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
      .pipe(
        map(rep => {
          const url_media = {...rep};
          this.snackbar.open(`Modification de l'url du jeu avec succes`, 'Close', {
            duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          return url_media;
        }),
        shareReplay(),
        catchError(err => {
          console.log(err);
          this.snackbar.open(`Modification de l'url du jeu invalide ${err.error.message}` , 'Close', {
            duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          throw new Error(`update result : ${err}`)
        })
      )
  }
}
