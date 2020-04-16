import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../services/examen.service';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../services/eleves.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-afficherexamen',
  templateUrl: './afficherexamen.component.html',
  styleUrls: ['./afficherexamen.component.scss']
})
export class AfficherexamenComponent implements OnInit {
  id:string;
  eleve:any;
  public examens:any;
  constructor(
    private route:ActivatedRoute,
    private eleveService:EleveService,
    private examenService:ExamenService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Find_Eleve(this.id)
    this.TrouverDevoirsDeLeleve(this.id)

  }
  Find_Eleve(matricule){
    this.eleveService.TrouverEleveParId(matricule)
      .subscribe(data => {
            this.eleve =data;
           
       
      }, error => 
      console.log(error)
      );
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
  ModifierNote(examen){
    this.MisAjourExamen(examen)
  }
  public succes(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Enrégistré avec succès',
      showConfirmButton: false,
      timer: 1500
    })


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
  MisAjourExamen(data){
    let matricule = data.eleve.matricule;
    let matiere = data.speciality.nom_speciality;
    let semestre = data.semestre;
    this.examenService.EditExamen(matricule,matiere,semestre,data)
    .subscribe(data => 
        this.succes(), 
      error => 
        console.log("erreur lors de la mis à jour")
      );   

  }


}
