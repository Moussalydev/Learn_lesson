import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveService } from '../services/eleves.service';

@Component({
  selector: 'app-detaileleve',
  templateUrl: './detaileleve.component.html',
  styleUrls: ['./detaileleve.component.scss']
})
export class DetaileleveComponent implements OnInit {
  id:string;
  eleve:any;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private eleveService:EleveService) { }

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


}
