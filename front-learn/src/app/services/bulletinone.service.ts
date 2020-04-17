import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppSettings} from '../services/serveur'


@Injectable({
  providedIn: 'root'
})
export class BulletinOneService {

  public baseUrl = AppSettings.API_ENDPOINT+AppSettings.base_api;

  

  constructor(
    private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    
    })
};

 
  AjouterMoyenne(bulletin: Object): Observable<Object> {

    return this.http.post(`${this.baseUrl}ajout-moyenne-first`,bulletin);
  }
  MoyenneEleveParId(matricule: string): Observable<any> {
    return this.http.get(`${this.baseUrl}moyenne-first/${matricule}`);
  }

  
 
 
  
  


}
