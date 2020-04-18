import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExamenService } from '../services/examen.service';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../services/eleves.service';
import { SpecialityService } from '../services/speciality.service';
import { BulletinOneService } from '../services/bulletinone.service';
import Swal from 'sweetalert2';
import * as jspdf from 'jspdf';  
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'



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
        private specialityService:SpecialityService,
        private bulletinOneService:BulletinOneService
    ) { }
  

  eleve:any;
  examens=[];
  public totals :number;
  public coefs:number;
  public semestre ="SEMESTER1";

  @ViewChild('content') content: ElementRef;

  makePdf() { 
    let doc = new jsPDF();
    doc.addHTML(this.content.nativeElement, function() {
       doc.save("obrz.pdf");
    });
  }
  



  ngOnInit(): void {

      this.id = this.route.snapshot.params['id'];
       this.Find_Eleve(this.id)

      this.Moyenne_final(this.id);
      this.TotalDuSemestre(this.id)
      this.TotalCoefsDuSemestre(this.id)

      


     
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

    this.specialityService.AfficherTouteMatiere().subscribe(
      data => {
          for(let i = 0; i<data.length; i++){
              this.examenService.TrouverEleveParEleve(matricule,data[i].nom_speciality,this.semestre)
              .subscribe(data => {
                          this.examens.push(data);
                }
                
                , error => 
                console.log(error)
          
              );
          }
      },
        (error) => {
          
          }
     );
       
  }

  TotalDuSemestre(matricule){
    this.examenService.TotalSemestre(matricule,this.semestre)
    .subscribe(data => {
                this.totals = data.total;
       }
      
      , error => 
      console.log(error)

    );
  }
  TotalCoefsDuSemestre(matricule){
    this.examenService.TotalCoef(matricule,this.semestre)
    .subscribe(data => {
        
                this.coefs = data.total
       }
      
      , error => 
      console.log(error)

    );
  }
  public succes(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'bulletin vérifié et enrégistré',
      showConfirmButton: false,
      timer: 1500
    })


  }

  
  Valider(){
    let bulletin = {
       "eleve":this.eleve,
       "classe":this.eleve.niveau,
       "moyenne":this.totals/this.coefs
    }
    
    //this.sendToBack(bulletin)
   this.makePdf();
  }
  sendToBack(bulletin){
    this.bulletinOneService.AjouterMoyenne(bulletin)
    .subscribe(data =>
      console.log("success"), 
       error =>
        console.log("erreur dans l'enrégistrement !")
        );


  }

  

  


  

 


  

}
