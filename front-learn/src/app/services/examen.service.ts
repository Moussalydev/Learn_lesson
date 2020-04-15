import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppSettings} from '../services/serveur'


@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  public baseUrl = AppSettings.API_ENDPOINT+AppSettings.base_api;

  

  constructor(
    private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    
    })
};
AjouterNoteExamen(eleve: Object): Observable<Object> {

    return this.http.post(`${this.baseUrl}add-examen`,eleve);
  }
EditExamen(matricule: string,matiere:string,semestre, value: any): Observable<Object> {
  return this.http.put(`${this.baseUrl}note-examen`+"?"+"matricule="+matricule+"&"+"matiere="+matiere
    +"&"+"semestre="+semestre,value);
}


TrouverEleveParEleve(matricule: string,matiere:string,semestre:string): Observable<any> {
    return this.http.get(`${this.baseUrl}note-examen`+"?"+"matricule="+matricule+"&"+"matiere="+matiere+"&"+"semestre="+semestre);
  }

 AfficherLesNotes(): Observable<any> {
    return this.http.get(`${this.baseUrl}list-examen`);
  }

  
 
 

  
  


}
