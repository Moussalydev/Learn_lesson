import { Component, OnInit } from '@angular/core';
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
        private examenService:ExamenService,
        private eleveService:EleveService
    ) { }
  
  note_examen =[]

  eleve:any;
  



  ngOnInit(): void {

      this.id = this.route.snapshot.params['id'];
       this.Find_Eleve(this.id)

      


     
  }
  
 Find_Eleve(matricule){
    this.eleveService.TrouverEleveParId(matricule)
      .subscribe(data => {
            this.eleve =data;
       
      }, error => 
      console.log(error)
      );
  }
  

  Moyenne_final(matiere){
   
   var mynote :number;
    
    this.examenService.TrouverEleveParEleve(this.id,matiere,"SEMESTER1")
    .subscribe(data => {
        
                //mynote= data[0].note;
                //subject.next(mynote);
       }
      
      , error => 
      console.log(error)

    );
   
  }
  

 


  

}
