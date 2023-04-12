import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from "./composants/accueil.component";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {PageNotFoundComponent} from "./composants/page-not-found/page-not-found.component";
import {ProfilAdherentComponent} from "./profil-adherent/profil-adherent.component";
import {ModificationProfilComponent} from "./modification-profil/modification-profil.component";

const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component: AccueilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profil/:id', component: ProfilAdherentComponent},
  {path: 'profil-edit/:id', component: ModificationProfilComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


