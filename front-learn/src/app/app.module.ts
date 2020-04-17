import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ConnexionComponent } from './connexion/connexion.component';
import { EvaluerComponent } from './evaluer/evaluer.component';
import { ListElevesComponent } from './list-eleves/list-eleves.component';
import { AjoutElevesComponent } from './ajout-eleves/ajout-eleves.component';
import { AjoutSubjectComponent } from './ajout-subject/ajout-subject.component';
import { SignupComponent } from './signup/signup.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { AjoutExamenComponent } from './ajout-examen/ajout-examen.component';
import { Bulletin2Component } from './bulletin2/bulletin2.component';
import { AfficherDevoirsComponent } from './afficher-devoirs/afficher-devoirs.component';
import { MenuComponent } from './menu/menu.component';
import { AfficherexamenComponent } from './afficherexamen/afficherexamen.component';
import { DetaileleveComponent } from './detaileleve/detaileleve.component';
import { ModifiermatiereComponent } from './modifiermatiere/modifiermatiere.component';



@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    EvaluerComponent,
    ListElevesComponent,
    AjoutElevesComponent,
    AjoutSubjectComponent,
    SignupComponent,
    BulletinComponent,
    AjoutExamenComponent,
    Bulletin2Component,
    AfficherDevoirsComponent,
    MenuComponent,
    AfficherexamenComponent,
    DetaileleveComponent,
    ModifiermatiereComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  entryComponents: [
    EvaluerComponent,
    AjoutExamenComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
