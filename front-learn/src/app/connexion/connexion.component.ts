import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../services/serveur';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import {catchError,retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  base_path = AppSettings.API_ENDPOINT+AppSettings.base_log+"signin";
  authForm: FormGroup;
  user:User;

  constructor(
      private formBuilder: FormBuilder,
      private http: HttpClient, 
      private router: Router
    ) { }

  initForm() {
    this.authForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],

    });


  }
  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  LogIn(user): Observable<User> {
  
    return this.http
      .post<User>(this.base_path, JSON.stringify(user))
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  public error(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Donnees invalides',

    })
  }

  

  ngOnInit(): void {

    this.initForm();
  }

  

  onSubmitForm() {

      const formValue = this.authForm.value;
      const user = new User(
        formValue['usernameOrEmail'],
        formValue['password'],
    
      );
     

    }

}
