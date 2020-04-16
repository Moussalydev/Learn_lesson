import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../services/examen.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-afficherexamen',
  templateUrl: './afficherexamen.component.html',
  styleUrls: ['./afficherexamen.component.scss']
})
export class AfficherexamenComponent implements OnInit {
  id:string;
  public examens:any;
  constructor(
    private route:ActivatedRoute,
    private examenService:ExamenService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.TrouverDevoirsDeLeleve(this.id)

  }
  TrouverDevoirsDeLeleve(id){

    this.examenService.AfficheExamenDeLeleve(id)
      .subscribe(data => {
       // console.log(data)
          this.examens = data;
      
        
      }, error => 
      console.log(error)
      );
  }

  delete(matricule,matiere,semestre){
  

    this.examenService.deleteExamen(matricule,matiere,semestre)
                .subscribe(
                  data => {
                    console.log(data);
                    
                  
     },
    
     error => console.log(error)
      
     );
     

    
             
    }


}
