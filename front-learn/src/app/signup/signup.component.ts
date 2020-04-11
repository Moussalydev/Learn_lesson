import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from '../models/user.signup';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  regForm: FormGroup;

  constructor(
    private http: HttpClient,
    private userService:UserService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {

    this.initForm();
  }
  initForm() {
    this.regForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]

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
  send(user){
 
    this.userService.Inscrire(user)
    .subscribe(data =>
       this.succes(), 
       error =>
        console.log(error)
        );


  }

  onSubmitForm() {

    const formValue = this.regForm.value;
    const user = new User(
      formValue['username'],
      formValue['email'],
      formValue['password']
  
    );

      this.send(user)
  
      
}

}
