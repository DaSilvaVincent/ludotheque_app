import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Jeu} from "../../models/jeu";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(private http: HttpClient, private authService: AuthService) { }

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
}
