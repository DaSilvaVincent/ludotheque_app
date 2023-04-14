import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatLineModule} from "@angular/material/core";
import {MatTableModule} from "@angular/material/table";
import { AccueilComponent } from './composants/accueil.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import localeFr from '@angular/common/locales/fr';
import localeEnExtra from '@angular/common/locales/extra/fr';
import {registerLocaleData} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {LoginComponent} from './composants/login.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastService} from "./services/toast.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./services/auth.interceptor";
import { RegisterComponent } from './composants/register.component';
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTooltipModule} from "@angular/material/tooltip";
import { FooterComponent } from './composants/footer/footer.component';
import {MatMenuModule} from "@angular/material/menu";
import { PageNotFoundComponent } from './composants/page-not-found/page-not-found.component';
import { ProfilAdherentComponent } from './composants/profil-adherent/profil-adherent.component';
import { ModificationProfilComponent } from './composants/modification-profil/modification-profil.component';
import {CreationJeuComponent} from "./composants/creation-jeu.component";
import {ModificationJeuComponent} from "./composants/modification-jeu.component";
import {ImageUploadComponent} from "./composants/image-upload.component";
import { TableauJeuComponent } from './composants/tableau-jeu/tableau-jeu.component';
import { CarteJeuComponent } from './composants/carte-jeu/carte-jeu.component';
import { ModificationAvatarProfilComponent } from './composants/modification-avatar-profil/modification-avatar-profil.component';
import {DetailsJeuComponent} from "./composants/details-jeu.component";
import {CreationCommentairesComponent} from "./composants/creation-commentaires.component";
import {ModificationCommentaireComponent} from "./composants/modification-commentaire.component";
import {SuppressionCommentaireComponent} from "./composants/suppression-commentaire.component";

registerLocaleData(localeFr, 'fr-FR', localeEnExtra);

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    PageNotFoundComponent,
    ProfilAdherentComponent,
    ModificationProfilComponent,
    CreationJeuComponent,
    ModificationJeuComponent,
    ImageUploadComponent,
    TableauJeuComponent,
    CarteJeuComponent,
    ModificationAvatarProfilComponent,
    DetailsJeuComponent,
    CreationCommentairesComponent,
    ModificationCommentaireComponent,
    SuppressionCommentaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatLineModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  providers: [ToastService, MatIconRegistry, {
    provide: LOCALE_ID,
    useValue: 'fr-FR'
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
