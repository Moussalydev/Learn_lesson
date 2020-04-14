import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppSettings} from '../services/serveur'


@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  public baseUrl = AppSettings.API_ENDPOINT+AppSettings.base_api;

  

  constructor(
    private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    
    })
};

 AfficherLesNotes(): Observable<any> {
    return this.http.get(`${this.baseUrl}list-evaluation`);
  }

  AjouterNote(eleve: Object): Observable<Object> {

    return this.http.post(`${this.baseUrl}add-evaluation`,eleve);
  }

  TrouverEleveParEleve(matricule: string,matiere:string,semestre:string): Observable<any> {
    return this.http.get(`${this.baseUrl}cumul`+"?"+"matricule="+matricule+"&"+"matiere="+matiere+"&"+"semestre="+semestre);
  }
 
  deleteEvaluation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}devoir/${id}`);
  }
  AfficherDevoirDeLeleve(matricule: string): Observable<any> {
    return this.http.get(`${this.baseUrl}evaluation/${matricule}`);
  }

  
  


}
