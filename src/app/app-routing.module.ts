import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from "./composants/accueil.component";
import {LoginComponent} from "./composants/login.component";
import {RegisterComponent} from "./composants/register.component";
import {PageNotFoundComponent} from "./composants/page-not-found/page-not-found.component";
import {ProfilAdherentComponent} from "./composants/profil-adherent/profil-adherent.component";
import {ModificationProfilComponent} from "./composants/modification-profil/modification-profil.component";
import {CreationJeuComponent} from "./composants/creation-jeu.component";
import {ModificationJeuComponent} from "./composants/modification-jeu.component";
import {ImageUploadComponent} from "./composants/image-upload.component";
import {TableauJeuComponent} from "./composants/tableau-jeu/tableau-jeu.component";
import {CarteJeuComponent} from "./composants/carte-jeu/carte-jeu.component";
import {ModificationAvatarProfilComponent} from "./composants/modification-avatar-profil/modification-avatar-profil.component";
import {DetailsJeuComponent} from "./composants/details-jeu.component";
import {CreationCommentairesComponent} from "./composants/creation-commentaires.component";
import {ModificationCommentaireComponent} from "./composants/modification-commentaire.component";
import {SuppressionCommentaireComponent} from "./composants/suppression-commentaire.component";

const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component: AccueilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profil/:id', component: ProfilAdherentComponent},
  {path: 'profil-edit/:id', component: ModificationProfilComponent},
  {path: 'detailsJeu/:id', component: DetailsJeuComponent},
  {path: 'creationCommentaires/:id', component: CreationCommentairesComponent},
  {path: 'modificationCommentaire/:idJ/:idC', component: ModificationCommentaireComponent},
  {path: 'suppressionCommentaire/:idJ/:idC', component: SuppressionCommentaireComponent},
  {path: 'creationJeu', component: CreationJeuComponent},
  {path: 'modificationJeu/:id', component: ModificationJeuComponent},
  {path: 'imageUpload/:id', component: ImageUploadComponent},
  {path: 'listeJeu', component: TableauJeuComponent},
  {path: 'carteJeu', component: CarteJeuComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


