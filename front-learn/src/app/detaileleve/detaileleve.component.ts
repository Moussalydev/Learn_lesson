import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveService } from '../services/eleves.service';
import { BulletinOneService } from '../services/bulletinone.service';
import { BulletinTwoService } from '../services/bulletintwo.service';

@Component({
  selector: 'app-detaileleve',
  templateUrl: './detaileleve.component.html',
  styleUrls: ['./detaileleve.component.scss']
})
export class DetaileleveComponent implements OnInit {
  id:string;
  eleve:any;
  nombre_eleve_classe:any;
  nombre_bulletin_sem1:any;
  nombre_bulletin_sem2:any;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private eleveService:EleveService,
    private bulletinOneService:BulletinOneService,
    private bulletinTwoService:BulletinTwoService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.Find_Eleve(this.id)

    this.eleveService.TrouverEleveParId(this.id)
    .subscribe(data => {
          this.NombreEleveClasse(data.niveau)
          this.NombreBulletinSemestre1Classe(data.niveau)
          this.NombreBulletinSemestre2Classe(data.niveau)
         
         
     
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
  releveDevoir(matricule){
    this.router.navigate(['devoirs', matricule]);

  }
  releveCompos(matricule){
    this.router.navigate(['compos', matricule]);

  }
  bulletin1(matricule){
    this.router.navigate(['bulletin1', matricule]);

  }
  bulletin2(matricule){
    this.router.navigate(['bulletin2', matricule]);

  }
  NombreEleveClasse(classe){
    this.eleveService.NombreEleves(classe)
      .subscribe(data => {
            this.nombre_eleve_classe =data;
            
           
       
      }, error => 
      console.log(error)
      );
  }

  NombreBulletinSemestre1Classe(classe){
    this.bulletinOneService.Nombre_bulletin_semOne(classe)
      .subscribe(data => {
            this.nombre_bulletin_sem1 =data;
            
           
       
      }, error => 
      console.log(error)
      );
  }
  NombreBulletinSemestre2Classe(classe){
    this.bulletinTwoService.Nombre_bulletin_semTwo(classe)
      .subscribe(data => {
            this.nombre_bulletin_sem2 =data;
            
           
       
      }, error => 
      console.log(error)
      );
  }


}
