import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { EvaluerComponent } from './evaluer/evaluer.component';
import { ListElevesComponent } from './list-eleves/list-eleves.component';
import { AjoutElevesComponent } from './ajout-eleves/ajout-eleves.component';
import { AjoutSubjectComponent } from './ajout-subject/ajout-subject.component';
import { SignupComponent } from './signup/signup.component';








const routes: Routes = [
  {path:'signin',component: ConnexionComponent},
  {path:'signup',component: SignupComponent},
  {path:'list-eleves',component: ListElevesComponent},
  {path:'ajout-eleves',component: AjoutElevesComponent},
  {path:'ajout-matiere',component: AjoutSubjectComponent},
  {path:'evaluer',component:EvaluerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
