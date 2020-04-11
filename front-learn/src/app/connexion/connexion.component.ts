import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError,retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import {AppSettings} from '../services/serveur';
import { User } from '../models/user.model';


export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
}
@Injectable({
  providedIn: 'root'
})


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
    private http: HttpClient, 
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],

    });


  }
  public error(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Donnees invalides',

    })
}

httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': 'Bearer ' + localStorage.getItem("token")
  
  })
};

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
      .post<User>(this.base_path, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  Auth(user){

  this.LogIn(user).subscribe((response) => {

         sessionStorage.setItem("token",response["accessToken"])

    },(error)=>{
  
        this.error();
    }

  );
  
}


  
ngOnInit() {

  this.initForm();

}

onSubmitForm() {

  const formValue = this.authForm.value;
  const user = new User(
    formValue['usernameOrEmail'],
    formValue['password'],

  );

 
  this.Auth(user);


  }

}