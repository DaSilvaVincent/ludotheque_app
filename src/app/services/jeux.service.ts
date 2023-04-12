import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, shareReplay, tap} from "rxjs";
import {Jeu} from "../../models/jeu";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  accueilJeux():
    Observable<Jeu[]> {
    const url = 'http://127.0.0.1:8000/api/jeu/indexVisiteur';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.authService.userValue.jwtToken
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

  getJeux(sort: string = 'asc', nb_joueur_min: number = 2): Observable<Jeu[]> {
    const url = 'http://127.0.0.1:8000/api/jeu/indexAdherent';
    let params = new HttpParams();
    params = params.append('sort', sort);
    params = params.append('nb_joueur_min', nb_joueur_min);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.authService.userValue.jwtToken
      }),
      params: params
    };
    return this.http.get<any>(url, httpOptions).pipe(
      map(res => res.data as Jeu[]),
      tap(res => console.log('hey : ', res)),
      catchError(err => {
        console.log('Erreur http : ', err);
        return of([]);
      }),
    );
  }

  getJeu(id: number) : Observable<Jeu[]> {
    const url = `http://127.0.0.1:8000/api/jeu/showJeu/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.authService.userValue.jwtToken
      }),
    };
    return this.http.get<any>(url, httpOptions).pipe(
      map(res => res.data as Jeu[]),
      tap(res => console.log('hey : ', res)),
      catchError(err => {
        console.log('Erreur http : ', err);
        return of([]);
      }),
    );
  }

  noteJeu(id: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/jeu/showJeu/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.authService.userValue.jwtToken
      }),
    };
    return this.http.post(url, null, httpOptions).pipe(
      tap(res => console.log('note added successfully')),
      catchError(err => {
        console.log('Erreur http : ', err);
        return of([]);
      }),
    );
  }

/*
  updateJeu(request: JeuRequest,id: number): Observable<Jeu[]> {
    const url = `${environment.apiUrl}/jeu/updateJeu/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.authService.userValue.jwtToken})
    };
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
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.authService.userValue.jwtToken})
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
  }*/
}
