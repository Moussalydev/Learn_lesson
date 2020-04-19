import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppSettings} from '../services/serveur'


@Injectable({
  providedIn: 'root'
})
export class EleveService {

  public baseUrl = AppSettings.API_ENDPOINT+AppSettings.base_api;

  

  constructor(
    private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    
    })
};



 AfficherTous(): Observable<any> {
    return this.http.get(`${this.baseUrl}list-eleve`);
  }

  AjouterEleve(eleve: Object): Observable<Object> {

    return this.http.post(`${this.baseUrl}add-eleve`,eleve);
  }

  TrouverEleveParId(matricule: string): Observable<any> {
    return this.http.get(`${this.baseUrl}eleve/${matricule}`);
  }
 
  EditerEleve(matricule: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}eleve/${matricule}`, value);
  }

  supprimerEleve(matricule: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}eleve/${matricule}`);
  }

  NombreEleves(niveau: string): Observable<any> {
    return this.http.get(`${this.baseUrl}nombre-eleve`+"?"+"niveau="+niveau);
  }

  
  


}
