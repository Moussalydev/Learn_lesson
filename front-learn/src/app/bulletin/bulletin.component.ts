import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../services/examen.service';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../services/eleves.service';
import { SpecialityService } from '../services/speciality.service';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {
  id:string;
  constructor(
        private route:ActivatedRoute, 
        private examenService:ExamenService,
        private eleveService:EleveService,
        private specialityService:SpecialityService
    ) { }
  
  note_examen =[]

  eleve:any;
  examens=[];
  public totals :number;
  public coefs:number;
  



  ngOnInit(): void {

      this.id = this.route.snapshot.params['id'];
       this.Find_Eleve(this.id)

      this.Moyenne_final(this.id);

      this.TotalDuSemestre(this.id)

      


     
  }
  
 Find_Eleve(matricule){
    this.eleveService.TrouverEleveParId(matricule)
      .subscribe(data => {
            this.eleve =data;
           
       
      }, error => 
      console.log(error)
      );
  }
  

  Moyenne_final(matricule){
   
    
    this.examenService.TrouverEleveParEleve(matricule,"Espagnol","SEMESTER1")
    .subscribe(data => {
        
                this.examens.push(data);
       }
      
      , error => 
      console.log(error)

    );
    this.examenService.TrouverEleveParEleve(matricule,"Anglais","SEMESTER1")
    .subscribe(data => {
        
            this.examens.push(data);
       }
      
      , error => 
      console.log(error)

    );
   /*  this.examenService.TrouverEleveParEleve(matricule,"science physique","SEMESTER1")
    .subscribe(data => {
        
            this.examens.push(data);
       }
      
      , error => 
      console.log(error)

    ); */
   /*  this.examenService.TrouverEleveParEleve(matricule,"compo française","SEMESTER1")
    .subscribe(data => {
        
            this.examens.push(data);
           
            
       }
      
      , error => 
      console.log(error)

    );
     */

   
  }

  TotalDuSemestre(matricule){
    this.examenService.TotalSemestre(matricule,"SEMESTER1")
    .subscribe(data => {
        
                this.totals = data.total;
                
       }
      
      , error => 
      console.log(error)

    );
  }
  TotalCoefsDuSemestre(matricule){
    this.examenService.TotalCoef(matricule,"SEMESTER1")
    .subscribe(data => {
        
                this.coefs = data.total
       }
      
      , error => 
      console.log(error)

    );
  }

  


  

 


  

}
