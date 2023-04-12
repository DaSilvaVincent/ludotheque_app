import { Injectable } from '@angular/core';
import {UserInfo} from "../../models/userInfo";
import {AdherentRequest} from "../../models/interface";
import {catchError, map, Observable, of, shareReplay} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService, private snackbar: MatSnackBar) { }

  getProfil(id: number):
    Observable<AdherentRequest> {
    const url = `${environment.apiUrl}/adherent/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.authService.userValue.jwtToken})
    };
    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.adherent),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of();
        }),
      );
  }

  updateProfil(request: AdherentRequest): Observable<UserInfo[]> {
    const url = `${environment.apiUrl}/adherent/${this.authService.userValue.id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.authService.userValue.jwtToken})
    };
    return this.http.put<any>(url,{
      nom: request.nom,
      prenom: request.prenom,
      login: request.login,
      pseudo: request.pseudo,
      email: request.email,
      password: request.password
    },{
      headers: new HttpHeaders({'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+this.authService.userValue.jwtToken})
    })
      .pipe(
        map(rep => {
          const user = {...rep.user};
          this.snackbar.open(`Modification du profil avec succes`, 'Close', {
            duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          return user;
        }),
        shareReplay(),
        catchError(err => {
          console.log(err);
          this.snackbar.open(`Modification du profil invalide ${err.error.message}` , 'Close', {
            duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          throw new Error(`update result : ${err}`)
        })
      )
  }
}
