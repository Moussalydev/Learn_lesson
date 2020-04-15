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
 
  deleteEvaluation(matricule: string,matiere:string,semestre:string,date:Date): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete-eval`+"?"+"matricule="+matricule+"&"+"matiere="+matiere
    +"&"+"semestre="+semestre +"&"+"date="+date);
  }
  AfficherDevoirDeLeleve(matricule: string): Observable<any> {
    return this.http.get(`${this.baseUrl}evaluation/${matricule}`);
  }
  TrouverDevoirDate(matricule: string,matiere:string,semestre:string,date:Date): Observable<any> {
    return this.http.get(`${this.baseUrl}devoir-date`+"?"+"matricule="+matricule+"&"+"matiere="+matiere
    +"&"+"semestre="+semestre +"&"+"date="+date);
  }

  
  


}
