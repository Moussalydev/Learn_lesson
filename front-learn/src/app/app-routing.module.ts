import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { EvaluerComponent } from './evaluer/evaluer.component';
import { ListElevesComponent } from './list-eleves/list-eleves.component';
import { AjoutElevesComponent } from './ajout-eleves/ajout-eleves.component';
import { AjoutSubjectComponent } from './ajout-subject/ajout-subject.component';
import { SignupComponent } from './signup/signup.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { Bulletin2Component } from './bulletin2/bulletin2.component';
import { AjoutExamenComponent } from './ajout-examen/ajout-examen.component';
import { AfficherDevoirsComponent } from './afficher-devoirs/afficher-devoirs.component';
import { AfficherexamenComponent } from './afficherexamen/afficherexamen.component';
import { DetaileleveComponent } from './detaileleve/detaileleve.component';
import { EditerEleveComponent } from './editer-eleve/editer-eleve.component';














const routes: Routes = [
  {path:'signin',component: ConnexionComponent},
  {path:'signup',component: SignupComponent},
  {path:'list-eleves',component: ListElevesComponent},
  {path:'details/:id',component:DetaileleveComponent},
  {path:'eleve/:id',component:EditerEleveComponent},
  {path:'devoirs/:id',component:AfficherDevoirsComponent},
  {path:'compos/:id',component:AfficherexamenComponent},
  {path:'bulletin1/:id',component: BulletinComponent},
  {path:'bulletin2/:id',component:Bulletin2Component},
  {path:'ajout-eleves',component: AjoutElevesComponent},
  {path:'ajout-matiere',component: AjoutSubjectComponent},
  {path:'evaluer',component:EvaluerComponent},
  {path:'ajout-examen',component:AjoutExamenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
