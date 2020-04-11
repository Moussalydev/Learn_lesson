import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppSettings} from '../services/serveur'


@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  public baseUrl = AppSettings.API_ENDPOINT+AppSettings.base_api;

  

  constructor(
    private http: HttpClient
    ) {}

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    
    })
};

 AfficherTouteMatiere(): Observable<any> {
    return this.http.get(`${this.baseUrl}list-subject`,this.httpOptions);
  }

  AjouterMatiere(matiere: Object): Observable<Object> {

    return this.http.post(`${this.baseUrl}add-subject`,matiere,this.httpOptions);
  }

  

  
  


}
