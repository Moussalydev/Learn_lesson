import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Evaluer } from '../models/evaluer.model';
import { SpecialityService } from '../services/speciality.service';
import { EvaluationService } from '../services/evaluation.service';
import { ExamenService } from '../services/examen.service';

@Component({
  selector: 'app-evaluer',
  templateUrl: './evaluer.component.html',
  styleUrls: ['./evaluer.component.scss']
})
export class EvaluerComponent implements OnInit {

  evalForm: FormGroup;
  public subjects:any;
  public examendata:any
  public examen_is_recorded = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private http: HttpClient,
      private specialityService:SpecialityService,
      private evaluationService:EvaluationService,
      private examenService:ExamenService

    ) { }
  subject:any;

  @Input() public data;
  @Input() public modalRef;

  public Evaluation ={
    "eleve":{
      "matricule":""
    },
    "speciality":{
      "nom_speciality":""
    },
    "note":0,
    "date":new Date(),
    "semestre":""

  }
  
  initForm() {
    this.evalForm = this.formBuilder.group({
      subject: ['', Validators.required],
      semestre: ['', Validators.required],
      date: '',
      note:['', Validators.required],
     
    });
    
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

  ngOnInit(): void {

    this.Evaluation.eleve = this.data;
    this.FindSubjects();
   

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
  VerifierExamenExist(matricule,matiere,semestre){
    this.examenService.TrouverEleveParEleve(matricule,matiere,semestre)
    .subscribe(data => {
              
              this.examendata = data;
              console.log(data)
        }
      
      , error => 
      console.log(error)

    );
  }
  MisAjourExamen(matricule,matiere,semestre){
    var nouvelle_moyenne :number;
           
          this.evaluationService.TrouverEleveParEleve(matricule,matiere,semestre)
          .subscribe(data => {
                      
                  nouvelle_moyenne =Number(data.note);
                  
                      
                  this.examenService.TrouverEleveParEleve(matricule,matiere,semestre)
                  .subscribe(data => {

                              data.notedevoir = nouvelle_moyenne;
                              data.total = nouvelle_moyenne + data.note;
                              data.total /=2;
                              data.total = (data.total) *(data.speciality.coef);
                              
                             this.examenService.EditExamen(matricule,matiere,semestre,data)
                                .subscribe(data => 
                                    console.log("mis a jour avec succes"), 
                                  error => 
                                    console.log("erreur lors de la mis à jour")
                          );      
                      }
                    
                    , error => 
                    console.log(error)
              
                  );

              }
            
            , error => 
            console.log(error)
      
          );
  }

  onSubmitForm() {

    const formValue = this.evalForm.value;
    const evaluer = new Evaluer(
      formValue['subject'],
      formValue['semestre'],
      formValue['date'],
      formValue['note']
      
    );
    
    // Récupérer la matiere choisie
    this.specialityService.FindSubject(evaluer.subject)
      .subscribe(data => {
          
          this.Evaluation.speciality = data;
          this.Evaluation.note = evaluer.note;
          this.Evaluation.semestre = evaluer.semestre;
          this.Evaluation.date = evaluer.date;

    
          this.sendToBack(this.Evaluation)

          this.examenService.TrouverEleveParEleve(
            this.Evaluation.eleve.matricule,
            this.Evaluation.speciality.nom_speciality,
            this.Evaluation.semestre)
          .subscribe(data => {
                    
                    this.MisAjourExamen(
                      this.Evaluation.eleve.matricule,
                      this.Evaluation.speciality.nom_speciality,
                      this.Evaluation.semestre)
              }
            
            , error => 
            console.log("donnée existe pas dans la base !")
      
          );
          

          
       
        
      }, error => 
      console.log(error)
      );
       
      
  }
  



}
