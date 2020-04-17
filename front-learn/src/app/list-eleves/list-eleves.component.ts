import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EleveService } from '../services/eleves.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EvaluerComponent } from '../evaluer/evaluer.component';
import { AjoutExamenComponent } from '../ajout-examen/ajout-examen.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-eleves',
  templateUrl: './list-eleves.component.html',
  styleUrls: ['./list-eleves.component.scss']
})
export class ListElevesComponent implements OnInit {

  constructor(
    private eleveService:EleveService,
    private router:Router,
    private http: HttpClient,
    private modalService: NgbModal
    ) { }
  centered = true;
  eleves:any;



  ngOnInit(): void {
    this.ChargerEleves();


  }

  ChargerEleves() {
  
      this.eleveService.AfficherTous().subscribe(
        data => {
          this.eleves = data;
        },
          (error) => {
              console.log(error)
            
          }
      );
 
  }

  OpenDialog(data){
    const modalRef = this.modalService.open(EvaluerComponent,
        {
         centered: this.centered,
  
        }
    );
  
    modalRef.componentInstance.name = 'Erreur lors de la sauvegarde de votre avis';
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }

  OpenDialogCompo(data){
    const modalRef = this.modalService.open(AjoutExamenComponent,
        {
         centered: this.centered,
  
        }
    );
  
    modalRef.componentInstance.name = 'Erreur lors de la sauvegarde de votre avis';
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.modalRef = modalRef;
  }
  

  Noter(eleve){
    this.OpenDialog(eleve)

  }

  NoterCompo(eleve){
    this.OpenDialogCompo(eleve)

  }
  openDetails(matricule){

    this.router.navigate(['details', matricule]);


  }
  

}
