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
import { DashboardComponent } from './dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import localeFr from '@angular/common/locales/fr';
import localeEnExtra from '@angular/common/locales/extra/fr';
import {registerLocaleData} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {LoginComponent} from './login.component';
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastService} from "./services/toast.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./services/auth.interceptor";
import { RegisterComponent } from './register.component';
import {MatSelectModule} from "@angular/material/select";

import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
registerLocaleData(localeFr, 'fr-FR', localeEnExtra);


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent
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
