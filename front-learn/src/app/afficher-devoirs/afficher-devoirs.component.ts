import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../services/evaluation.service';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { ExamenService } from '../services/examen.service';

@Component({
  selector: 'app-afficher-devoirs',
  templateUrl: './afficher-devoirs.component.html',
  styleUrls: ['./afficher-devoirs.component.scss']
})
export class AfficherDevoirsComponent implements OnInit {

  id :string;
  constructor(
    private route:ActivatedRoute,
    private evaluationService:EvaluationService,
    private examenService:ExamenService
  ) { }


  public devoirs:any;

  matricule:string;
  matiere:string;
  semestre:string;
  date:any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.TrouverDevoirsDeLeleve(this.id)

  }
  TrouverDevoirsDeLeleve(id){

    this.evaluationService.AfficherDevoirDeLeleve(id)
      .subscribe(data => {
       // console.log(data)
          this.devoirs = data;
      
        
      }, error => 
      console.log(error)
      );
  }

  delete(devoir){
    this.matricule = devoir.eleve.matricule;
    this.matiere =devoir.speciality.nom_speciality;
    this.semestre = devoir.semestre;
    this.date = devoir.date;

    /* this.evaluationService.deleteEvaluation(this.matricule,this.matiere,this.semestre,this.date)
                .subscribe(
                  data => {
                    console.log(data);
                  },
                  error => console.log(error)); */
          
  
    
            var nouvelle_moyenne :number;
             
            this.evaluationService.TrouverEleveParEleve(this.matricule,this.matiere,this.semestre)
            .subscribe(data => {
                        
                    nouvelle_moyenne =Number(data.note);
                        
                    this.examenService.TrouverEleveParEleve(this.matricule,this.matiere,this.semestre)
                    .subscribe(data => {

                                data.notedevoir = nouvelle_moyenne;
                                
                              this.examenService.EditExamen(this.matricule,this.matiere,this.semestre,data)
                                  .subscribe(data => 
                                    console.log("mis a jour avec succes"), 
                                    error => 
                                    console.log("erreur lors de la mis à jour")
                                    ); 
                                    
                                   
                                
                        }
                      
                      , error => 
                      console.log(error)
                
                    );

                }
              
              , error => 
              console.log(error)
        
            );
                  
      }

}
