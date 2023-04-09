import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, shareReplay, tap, throwError} from "rxjs";
import {ANONYMOUS_USER, User} from "../../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserInfo} from "../../models/userInfo";
import {ToastService} from "./toast.service";
import {Router} from "@angular/router";
import {RegisterComponent} from "../register.component";
import {RegisterRequest} from "../../models/interface";
import {MatSnackBar} from "@angular/material/snack-bar";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);
  public user$: Observable<User> = this.userSubject.asObservable();

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http: HttpClient,
              private snackbar: MatSnackBar,
              private router: Router) {
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/loginVisitor`, {email, password}, httpOptions)
      .pipe(
        map(rep => {
          const user = {...rep.user, jwtToken: rep.authorisation.token};
          this.userSubject.next(user);
          return user;
        }),
        shareReplay(),
        tap(() => this.snackbar.open(`Bienvenue, ${this.userValue.prenom}`, 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        })),
        catchError(err => {
          this.userSubject.next(ANONYMOUS_USER);
          this.snackbar.open('Connexion invalide', 'Close', {
            duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
          })
          throw new Error(`login result : ${err}`)
        })
      );
  }

  register(request: RegisterRequest): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/registerVisitor`, {
      login: request.login,
      email: request.email,
      nom: request.nom,
      prenom: request.prenom,
      pseudo: request.pseudo,
      password: request.password
    }, httpOptions).pipe(
      map(rep => {
        const user = {...rep.user, jwtToken: rep.authorisation.token};

        this.userSubject.next(user);
        this.snackbar.open(`Bienvenue, ${this.userValue.prenom}`, 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        return user;
      }),
      shareReplay(),
      catchError(err => {
        console.log(err);
        this.userSubject.next(ANONYMOUS_USER);
        this.snackbar.open(`Enregistrement invalide ${err.error.message}` , 'Close', {
          duration: 30000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        throw new Error(`register result : ${err}`)
      })
    )
  }

  logout(): void {
    const oldUser = this.userValue;
    this.http.post<any>(`${environment.apiUrl}/logoutVisitor`, {}, httpOptions)
      .subscribe(user =>
        this.snackbar.open(`A bientôt, ${oldUser.prenom}`, 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        })
      );
    this.userSubject.next(ANONYMOUS_USER);

    this.router.navigate(['/']);
  }

  public get userValue(): User {
    return this.userSubject.value;
  }
}
