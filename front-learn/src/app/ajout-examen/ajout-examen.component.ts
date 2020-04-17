import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Evaluer } from '../models/evaluer.model';
import { SpecialityService } from '../services/speciality.service';
import { EvaluationService } from '../services/evaluation.service';
import { ExamenService } from '../services/examen.service';
import { Examen } from '../models/ajout.exam';

@Component({
  selector: 'app-ajout-examen',
  templateUrl: './ajout-examen.component.html',
  styleUrls: ['./ajout-examen.component.scss']
})
export class AjoutExamenComponent implements OnInit {

  evalForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private http: HttpClient,
      private specialityService:SpecialityService,
      private examenService:ExamenService,
      private evaluationService:EvaluationService

    ) { }
  subject:any;
  public subjects:any;

  @Input() public data;
  @Input() public modalRef;

  public Evaluation ={
    "eleve":{},
    "speciality":{
      "nom_speciality":"",
      "coef":0
    },
    "notedevoir":0,
    "dateExamen":new Date(),
    "note":0,
    "total":0,
    "semestre":""

  }
  
  initForm() {
    this.evalForm = this.formBuilder.group({
      subject: ['', Validators.required],
      semestre: ['', Validators.required],
      dateExamen:'',
      notedevoir:'',
      note:['', Validators.required],
     
    });
    
    

    
  }

  ngOnInit(): void {

    this.Evaluation.eleve = this.data;
    this.FindSubjects()

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
      title: 'Attention',
      text: 'Note dejà enrégistrée !',
      footer: '<a href>Why do I have this issue?</a>'
    })

  }
  sendToBack(examen){
    this.examenService.AjouterNoteExamen(examen)
    .subscribe(data =>
       this.succes(), 
       error =>
        this.error());


  }
  FindSubjects(){
    this.specialityService.AfficherTouteMatiere().subscribe(
      data => {
        this.subjects = data;
      },
        (error) => {
          console.log(error)
          
        }
    );
  }
  AjouterExamen(matricule,matiere,semestre){
    this.evaluationService.TrouverEleveParEleve(matricule,matiere,semestre)
    .subscribe(data => {
               
                this.Evaluation.notedevoir =Number(data.note);
                this.Evaluation.total = this.Evaluation.notedevoir + this.Evaluation.note;
                this.Evaluation.total /=2;
                this.Evaluation.total = (this.Evaluation.total) *(this.Evaluation.speciality.coef);
                this.sendToBack(this.Evaluation)
       }
      
      , error => 
      console.log(error)

    );
  }

  onSubmitForm() {

    const formValue = this.evalForm.value;
    const evaluer = new Examen(
      formValue['subject'],
      formValue['semestre'],
      formValue['notedevoir'],
      formValue['dateExamen'],
      formValue['note'],
      
    );
    
    // Récupérer la matiere choisie
    this.specialityService.FindSubject(evaluer.subject)
      .subscribe(data => {
          
          this.Evaluation.speciality = data;
          this.Evaluation.note = evaluer.note;
          this.Evaluation.semestre = evaluer.semestre;
          this.Evaluation.dateExamen = evaluer.dateExamen;

          this.examenService.TrouverEleveParEleve(this.data.matricule,evaluer.subject,this.Evaluation.semestre)
            .subscribe(data => {
             
                  this.error();
              
            }, error => 
              this.AjouterExamen(this.data.matricule,evaluer.subject,evaluer.semestre)
            ); 
           
            
            
      }, error => 
      console.log(error)
      );
       
      
  }



}
