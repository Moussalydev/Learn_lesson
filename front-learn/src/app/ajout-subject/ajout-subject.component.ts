import { Component, OnInit } from '@angular/core';
import { SpecialityService } from '../services/speciality.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import { Subject } from '../models/speciality.model';



@Component({
  selector: 'app-ajout-subject',
  templateUrl: './ajout-subject.component.html',
  styleUrls: ['./ajout-subject.component.scss']
})
export class AjoutSubjectComponent implements OnInit {
  myForm: FormGroup;
  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private specialityService:SpecialityService
    ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.myForm = this.formBuilder.group({
      nom_speciality: ['', Validators.required],
      coef: ['', Validators.required],
    
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

  sendToBack(subject){
    this.specialityService.AjouterMatiere(subject)
    .subscribe(data =>
       this.succes(), 
       error =>
        this.error());


  }
  onSubmitForm() {

    const formValue = this.myForm.value;
    const speciality = new Subject(
          formValue['nom_speciality'],
          formValue['coef'],
      
    );
    
      this.sendToBack(speciality) 
      
  }


}
