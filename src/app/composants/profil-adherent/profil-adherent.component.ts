import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {AdherentRequest} from "../../../models/interface";

@Component({
  selector: 'app-profil-adherent',
  template: `
      <div>
        <mat-card>
          <mat-card-title>Informations du profil</mat-card-title>
          <mat-card-content>
            <p>Nom : {{infosUser.nom}}</p>
            <p>Prénom : {{infosUser.prenom}}</p>
            <p>Login : {{infosUser.login}}</p>
            <p>Pseudo : {{infosUser.pseudo}}</p>
            <p>Avatar : </p><img src="http://localhost:8000/storage/public/{{infosUser.avatar}}">
            <p>Commentaires : {{infosUser.nom}}</p>
            <p>Jeux achetes : {{infosUser.nom}}</p>
            <p>Jeux aimes : {{infosUser.nom}}</p>
            <p><mat-icon [routerLink]="['/profil-edit', infosUser.id]">loupe</mat-icon></p>
          </mat-card-content>
        </mat-card>
      </div>`,
  styles: [
    ':host { display: flex; justify-content: center; margin: 100px 0;}',
    'mat-card {  max-width: 600px;}',
    'mat-card-title, mat-card-content { display: flex; justify-content: center; flex-direction: column}',
    'mat-form-field { width: 100%; min-width: 300px; }'
  ]
})
export class ProfilAdherentComponent implements OnInit {

  id: number = +(this.route.snapshot.paramMap.get('id') || 0);
  infosUser: AdherentRequest;

  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private userService: UserService) {
    this.infosUser = <AdherentRequest>{};
    this.userService.getProfil(this.id).subscribe(value => (this.infosUser = value));
  }

  ngOnInit(): void {
  }

}
