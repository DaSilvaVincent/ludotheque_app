import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Commentaires} from "../../models/commentaires";
import {catchError, map, Observable, of, shareReplay} from "rxjs";
import {environment} from "../../environments/environment";
import {JeuRequest} from "../../models/JeuRequest";
import {Jeu} from "../../models/jeu";
import {CommentairesRequest} from "../../models/CommentairesRequest";

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {

  constructor(private http: HttpClient, private authService: AuthService, private snackbar: MatSnackBar) {
  }

  createCommentaire(request: Commentaires): Observable<Commentaires> {
    return this.http.post<any>(`${environment.apiUrl}/commentaires/createCommentaire`, {
      commentaire: request.commentaire,
      date_com: request.date_com,
      note: request.note,
      jeu_id: request.jeu_id,
      user_id: request.user_id
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).pipe(
      map(rep => {
        const commentaire = {...rep.comment};
        this.snackbar.open(`Creation du commentaire avec succes`, 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        return commentaire;
      }),
      shareReplay(),
      catchError(err => {
        console.log(err);
        this.snackbar.open(`Creation du commentaire invalide ${err.error.message}`, 'Close', {
          duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        throw new Error(`create result : ${err}`)
      })
    )
  }

  updateCommentaire(request: CommentairesRequest, id: number): Observable<Commentaires[]> {
    return this.http.put<any>(`${environment.apiUrl}/commentaires/updateCommentaire/${id}`, {
      commentaire: request.commentaire,
      date_com: request.date_com,
      note: request.note,
      jeu_id: request.jeu_id,
      user_id: request.user_id
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
      .pipe(
        map(rep => {
          const comment = {...rep.comment};
          this.snackbar.open(`Modification du commentaire avec succes`, 'Close', {
            duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          return comment;
        }),
        shareReplay(),
        catchError(err => {
          console.log(err);
          this.snackbar.open(`Modification du commentaire invalide ${err.error.message}`, 'Close', {
            duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          throw new Error(`update result : ${err}`)
        })
      )
  }

  delCommentaire(id: number): Observable<Commentaires> {
    const url = `${environment.apiUrl}/commentaires/deleteCommentaire/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.delete<any>(url, httpOptions)
      .pipe(
        map(rep => {
          const comment = {...rep.comment};
          this.snackbar.open(`Suppression du commetaire avec succes`, 'Close', {
            duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          return comment;
        }),
        shareReplay(),
        catchError(err => {
          console.log(err);
          this.snackbar.open(`Suppression du commentaire invalide ${err.error.message}`, 'Close', {
            duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          throw new Error(`delete result : ${err}`)
        })
      )
  }
}
