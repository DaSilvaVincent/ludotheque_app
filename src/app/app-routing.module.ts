import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from "./composants/accueil.component";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {PageNotFoundComponent} from "./composants/page-not-found/page-not-found.component";
import {ProfilAdherentComponent} from "./profil-adherent/profil-adherent.component";
import {ModificationProfilComponent} from "./modification-profil/modification-profil.component";
import {CreationJeuComponent} from "./composants/creation-jeu.component";
import {ModificationJeuComponent} from "./composants/modification-jeu.component";
import {ImageUploadComponent} from "./composants/image-upload.component";
import {TableauJeuComponent} from "./composants/tableau-jeu/tableau-jeu.component";

const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component: AccueilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profil/:id', component: ProfilAdherentComponent},
  {path: 'profil-edit/:id', component: ModificationProfilComponent},
  {path: 'creationJeu', component: CreationJeuComponent},
  {path: 'modificationJeu/:id', component: ModificationJeuComponent},
  {path: 'imageUpload/:id', component: ImageUploadComponent},
  {path: 'listeJeu', component: TableauJeuComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


