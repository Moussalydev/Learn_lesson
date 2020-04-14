import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EleveService } from '../services/eleves.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { Eleve } from '../models/eleves.model';


@Component({
  selector: 'app-ajout-eleves',
  templateUrl: './ajout-eleves.component.html',
  styleUrls: ['./ajout-eleves.component.scss']
})
export class AjoutElevesComponent implements OnInit {
  eleveForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private eleveService:EleveService
    ) { }

  ngOnInit(): void {

    this.initForm()

  }
  initForm() {
    this.eleveForm = this.formBuilder.group({
      matricule: ['', Validators.required],
      prenom: ['', Validators.required],
      nom:['', Validators.required],
      dateNaissance:['', Validators.required],
      lieuNaissance:['', Validators.required],
      niveau:['', Validators.required],
    });
    

    
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

  public error(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    })

  }

  sendToBack(eleves){
    this.eleveService.AjouterEleve(eleves)
    .subscribe(data =>
       this.succes(), 
       error =>
        this.error());


  }

  onSubmitForm() {

    const formValue = this.eleveForm.value;
    const eleves = new Eleve(
      formValue['matricule'],
      formValue['prenom'],
      formValue['nom'],
      formValue['dateNaissance'],
      formValue['lieuNaissance'],
      formValue['niveau'],
     
    );
    this.sendToBack(eleves)
       
      
      
  }

}
