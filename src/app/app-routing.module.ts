import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from "./composants/accueil.component";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {PageNotFoundComponent} from "./composants/page-not-found/page-not-found.component";
import {CreationJeuComponent} from "./composants/creation-jeu.component";
import {ModificationJeuComponent} from "./composants/modification-jeu.component";
import {ImageUploadComponent} from "./composants/image-upload.component";

const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'accueil', component: AccueilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'creationJeu', component: CreationJeuComponent},
  {path: 'modificationJeu/:id', component: ModificationJeuComponent},
  {path: 'imageUpload/:id', component: ImageUploadComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


