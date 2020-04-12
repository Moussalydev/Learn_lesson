import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Evaluer } from '../models/evaluer.model';
import { SpecialityService } from '../services/speciality.service';
import { EvaluationService } from '../services/evaluation.service';

@Component({
  selector: 'app-evaluer',
  templateUrl: './evaluer.component.html',
  styleUrls: ['./evaluer.component.scss']
})
export class EvaluerComponent implements OnInit {

  evalForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private http: HttpClient,
      private specialityService:SpecialityService,
      private evaluationService:EvaluationService

    ) { }
  subject:any;

  @Input() public data;
  @Input() public modalRef;

  public Evaluation ={
    "eleve":{},
    "speciality":{},
    "note":0,
    "semestre":""

  }
  
  initForm() {
    this.evalForm = this.formBuilder.group({
      subject: ['', Validators.required],
      semestre: ['', Validators.required],
      note:['', Validators.required],
     
    });
    
    

    
  }

  ngOnInit(): void {

    this.Evaluation.eleve = this.data;

    this.initForm()

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
  sendToBack(evaluation){
    this.evaluationService.AjouterNote(evaluation)
    .subscribe(data =>
       this.succes(), 
       error =>
        this.error());


  }

  onSubmitForm() {

    const formValue = this.evalForm.value;
    const evaluer = new Evaluer(
      formValue['subject'],
      formValue['semestre'],
      formValue['note']
      
    );
    
    // Récupérer la matiere choisie
    this.specialityService.FindSubject(evaluer.subject)
      .subscribe(data => {
          
          this.Evaluation.speciality = data;
          this.Evaluation.note = evaluer.note;
          this.Evaluation.semestre = evaluer.semestre;

          this.sendToBack(this.Evaluation)
          

          //Poster la note de l'eleve
          
       
        
      }, error => 
      console.log(error)
      );
       
      
  }



}
