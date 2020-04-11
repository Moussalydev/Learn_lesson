import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {AppSettings} from '../services/serveur'

export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  base_path = AppSettings.API_ENDPOINT+AppSettings.base_log+"signin";
  


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    })
  };
  

  
 


 


}