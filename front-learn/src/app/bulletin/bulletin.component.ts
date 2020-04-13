import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../services/evaluation.service';
import { ExamenService } from '../services/examen.service';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../services/eleves.service';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {
  id:string;
  constructor(
        private route:ActivatedRoute, 
        private evaluationService:EvaluationService,
        private examenService:ExamenService,
        private eleveService:EleveService
    ) { }
  
  moyenne_control_continu =[];
  note_examen =[]

  eleve:any;
  

  


 
  

  ngOnInit(): void {

      this.id = this.route.snapshot.params['id'];
      this.Moyenne_control_continu("Anglais");
      this.Moyenne_control_continu("Math");  

      


     
  }
  filterDuplicates(data) {
        let unique = [];
        if(data.length >= 1)
                        unique = [...new Set(data)];

                return unique;
    
 }
 Find_Eleve(matricule){
    this.eleveService.TrouverEleveParId(matricule)
      .subscribe(data => {
            this.eleve =data;
       
      }, error => 
      console.log(error)
      );
  }
  

  Moyenne_control_continu(matiere){
    
    this.evaluationService.TrouverEleveParEleve(this.id,matiere,"SEMESTER1")
    .subscribe(data => {
        if(matiere == "Math"){
                this.moyenne_control_continu.push({
                        "matiere":matiere,
                        "noteDevoir":data[0].note,
                        "coef": 3,
                        "noteExamen":0

                })
        }
        if(matiere == "Anglais" || matiere == "Espagnol" || matiere == "science physique" 
            || matiere =="compo française" || matiere =="EPS" || matiere =="SVT"){
                this.moyenne_control_continu.push({
                        "matiere":matiere,
                        "noteDevoir":data[0].note,
                        "coef": 2,
                        "noteExamen":0

                })
                
            
           }
           
           
        
       }
      
      , error => 
      console.log(error)

    );
   
  }
  

 


  

}
