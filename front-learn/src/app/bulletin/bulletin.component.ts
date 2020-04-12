import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../services/evaluation.service';
import { ExamenService } from '../services/examen.service';
import { ActivatedRoute } from '@angular/router';

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
        private examenService:ExamenService
    ) { }
  
  moyenne_control_continu =[];
  

  note_compo_math:number;

 
  

  ngOnInit(): void {

      this.id = this.route.snapshot.params['id'];

      this.Moyenne_control_continu("Math");  
      this.Moyenne_control_continu("Anglais");
      
      console.log(this.moyenne_control_continu)


      




  }

  Moyenne_control_continu(matiere){
    this.evaluationService.TrouverEleveParEleve(this.id,matiere,"SEMESTER1")
    .subscribe(data => {
            
        if(matiere == "Math"){
              this.moyenne_control_continu.push({
                  "matiere":matiere,
                  "noteDevoir":data[0].note,
                  "coef": 3

              })
        }
        else 
        if(matiere == "Anglais"){
          this.moyenne_control_continu.push({
              "matiere":matiere,
              "noteDevoir":data[0].note,
              "coef": 2

          })
      }
        

            

           
      }, error => 
      console.log(error)

    );
  }
  

  Note_Examen(matricule,matiere,semestre){

    this.examenService.TrouverEleveParEleve(matricule,matiere,semestre)
      .subscribe(data => {
              //console.log(data)
              
        
      }, error => 
      console.log(error)
      );
   }


  

}
