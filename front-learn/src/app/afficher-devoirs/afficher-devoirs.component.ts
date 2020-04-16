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
  ModifierNote(devoir){
    this.MisAjourDevoir(devoir)
    
  }

  delete(matricule,matiere,semestre,date){
  

    this.evaluationService.deleteEvaluation(matricule,matiere,semestre,date)
                .subscribe(
                  data => {
                    console.log(data);
                    
                  
     },
    
     error => console.log(error)
      
     );
     

    
             
    }
    MisAjourExamen(matricule,matiere,semestre){
      var nouvelle_moyenne :number;
             
            this.evaluationService.TrouverEleveParEleve(matricule,matiere,semestre)
            .subscribe(data => {
                        
                    nouvelle_moyenne =Number(data.note);
                    
                    this.examenService.TrouverEleveParEleve(matricule,matiere,semestre)
                    .subscribe(data => {

                              data.notedevoir = nouvelle_moyenne;
                              data.total = nouvelle_moyenne + data.note;
                              data.total /=2;
                              data.total = (data.total) *(data.speciality.coef);

                                
                               this.examenService.EditExamen(matricule,matiere,semestre,data)
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

    MisAjourDevoir(data){
      let matricule = data.eleve.matricule;
      let matiere = data.speciality.nom_speciality;
      let semestre = data.semestre;
      let date= data.date;
      this.evaluationService.EditDevoir(matricule,matiere,semestre,date,data)
      .subscribe(data => 
          console.log("devoir modifié avec succes"), 
        error => 
          console.log("erreur lors de la mis à jour")
        );   

    }

}

