import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../services/evaluation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-afficher-devoirs',
  templateUrl: './afficher-devoirs.component.html',
  styleUrls: ['./afficher-devoirs.component.scss']
})
export class AfficherDevoirsComponent implements OnInit {

  id :string;
  constructor(
    private route:ActivatedRoute,
    private evaluationService:EvaluationService
  ) { }

  public devoirs:any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.TrouverDevoirsDeLeleve(this.id)

  }
  TrouverDevoirsDeLeleve(id){

    this.evaluationService.AfficherDevoirDeLeleve(id)
      .subscribe(data => {
       // console.log(data)
       this.devoirs = data;
      
        
      }, error => 
      console.log(error)
      );
  }

}
