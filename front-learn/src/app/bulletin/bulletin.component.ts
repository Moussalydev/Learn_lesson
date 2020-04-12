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
  eleve:any;
  

  note_compo_math:number;
  note_compo_compfr:number;
  note_compo_espagnol:number;
  note_compo_svt:number;
  note_compo_anglais:number;
  note_compo_hg:number;
  note_compo_ort:number;
  note_compo_tsq:number;
  note_compo_ec:number;
  note_compo_pc:number;
  note_compo_eps:number;

 
  

  ngOnInit(): void {

      this.id = this.route.snapshot.params['id'];
      this.Moyenne_control_continu("Anglais");
      this.Moyenne_control_continu("Math");  
      //Note compomath
      this.examenService.TrouverEleveParEleve(this.id,"Math","SEMESTER1")
      .subscribe(data => {
              this.note_compo_math = data[0].note;
        
      }, error => 
      console.log(error)
      );
      //Compo Anglais
      this.examenService.TrouverEleveParEleve(this.id,"Anlais","SEMESTER1")
      .subscribe(data => {
              this.note_compo_anglais = data[0].note;
        
      }, error => 
      console.log(error)
      );

      //Compo Espagnol
      this.examenService.TrouverEleveParEleve(this.id,"Espagnol","SEMESTER1")
      .subscribe(data => {
              this.note_compo_espagnol = data[0].note;
        
      }, error => 
      console.log(error)
      );
       //Compo pc
       this.examenService.TrouverEleveParEleve(this.id,"science physique","SEMESTER1")
       .subscribe(data => {
               this.note_compo_pc = data[0].note;
         
       }, error => 
       console.log(error)
       );
       //Compo pc
       this.examenService.TrouverEleveParEleve(this.id,"compo française","SEMESTER1")
       .subscribe(data => {
               this.note_compo_compfr = data[0].note;
         
       }, error => 
       console.log(error)
       );
       //Compo pc
       this.examenService.TrouverEleveParEleve(this.id,"EPS","SEMESTER1")
       .subscribe(data => {
               this.note_compo_eps = data[0].note;
         
       }, error => 
       console.log(error)
       );
       //Compo pc
       this.examenService.TrouverEleveParEleve(this.id,"orthographe","SEMESTER1")
       .subscribe(data => {
               this.note_compo_ort = data[0].note;
         
       }, error => 
       console.log(error)
       );
       //Compo tsq
       this.examenService.TrouverEleveParEleve(this.id,"TSQ","SEMESTER1")
       .subscribe(data => {
               this.note_compo_tsq = data[0].note;
         
       }, error => 
       console.log(error)
       );
       //Compo hg
       this.examenService.TrouverEleveParEleve(this.id,"HG","SEMESTER1")
       .subscribe(data => {
               this.note_compo_hg = data[0].note;
         
       }, error => 
       console.log(error)
       );
        //Compo ec
        this.examenService.TrouverEleveParEleve(this.id,"EC","SEMESTER1")
        .subscribe(data => {
                this.note_compo_ec = data[0].note;
          
        }, error => 
        console.log(error)
        );
      
      
      
      
      
      
     



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
        else 
        if(matiere == "Anglais" || matiere == "Espagnol" || matiere == "science physique" 
            || matiere =="compo française" || matiere =="EPS" || matiere =="SVT"){

          this.moyenne_control_continu.push({
              "matiere":matiere,
              "noteDevoir":data[0].note,
              "coef": 2,
              "noteExamen":0
              

          })
      }
      else
          if(matiere == "orthographe" || matiere =="TSQ"){
            this.moyenne_control_continu.push({
                "matiere":matiere,
                "noteDevoir":data[0].note,
                "coef": 1,
                "noteExamen":0

            })
          }
          
          

           
      }, error => 
      console.log(error)

    );
   
  }
  

 


  

}
