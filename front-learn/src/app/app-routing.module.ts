import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { EvaluerComponent } from './evaluer/evaluer.component';




const routes: Routes = [
  {path:'signin',component: ConnexionComponent},
  {path:'evaluer',component:EvaluerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
