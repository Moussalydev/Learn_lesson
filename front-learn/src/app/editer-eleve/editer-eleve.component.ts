import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import { EleveService } from '../services/eleves.service';
import Swal from 'sweetalert2';
import { Eleve } from '../models/eleves.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-editer-eleve',
  templateUrl: './editer-eleve.component.html',
  styleUrls: ['./editer-eleve.component.scss']
})
export class EditerEleveComponent implements OnInit {

  id:string;
  eleveeditForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private eleveService:EleveService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.onEntry()

  }
  public succes(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Enrégistré avec succés',
      showConfirmButton: false,
      timer: 1500
    })


  }

  public error(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Erreur dans enregistrement!',
      footer: '<a href>Why do I have this issue?</a>'
    })

  }
  onEntry(){

    this.eleveService.TrouverEleveParId(this.id).subscribe((Eleve)=>{
      this.eleveeditForm = this.formBuilder.group({
        matricule: Eleve.matricule,
        prenom:Eleve.prenom,
        nom: Eleve.nom,
        dateNaissance:Eleve.dateNaissance.split("T00:00:00.000+0000")[0],
        lieuNaissance:Eleve.lieuNaissance,
        niveau:Eleve.niveau
        
      });
  
  });
}

EditerEleve(matricule,eleve){

  this.eleveService.EditerEleve(matricule,eleve)
    .subscribe(data => 
      this.succes(), 
      error => this.error());
  
}


onSubmitForm() {

  const formValue = this.eleveeditForm.value;
  const eleve = new Eleve(
     formValue['matricule'],
      formValue['prenom'],
      formValue['nom'],
      formValue['dateNaissance'],
      formValue['lieuNaissance'],
      formValue['niveau'],

     );
    // console.log(eleve)

     this.EditerEleve(this.id,eleve);
    
  }

}
