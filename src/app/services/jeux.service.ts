import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {Jeu} from "../../models/jeu";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(private http: HttpClient, private authService: AuthService) { }

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
      params = params.append('sort',sort);
      params = params.append('nb_joueur_min',nb_joueur_min);
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+this.authService.userValue.jwtToken
        }),
        params: params
      };
      return this.http.get<any>(url, httpOptions).pipe(
          map(res => res.data as Jeu[]),
          tap(res=> console.log('hey : ',res)),
          catchError(err => {
            console.log('Erreur http : ', err);
            return of([]);
          }),
        );
    }

}
