import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EleveService } from '../services/eleves.service';

@Component({
  selector: 'app-list-eleves',
  templateUrl: './list-eleves.component.html',
  styleUrls: ['./list-eleves.component.scss']
})
export class ListElevesComponent implements OnInit {

  constructor(
    private eleveService:EleveService,
    private http: HttpClient
    ) { }
  
  eleves:any;



  ngOnInit(): void {
    this.ChargerEleves();


  }

  ChargerEleves() {
  
      this.eleveService.AfficherTous().subscribe(
        data => {
          this.eleves = data;
        },
          (error) => {
              console.log(error)
            
          }
      );
 
  }

}
