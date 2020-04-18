import { PipeTransform, Pipe } from '@angular/core';
import { Eleve } from '../models/eleves.model';

@Pipe({
    name:'eleveFilter'
    
})
export class EleveFilterPipe implements PipeTransform{

    transform(eleves:Eleve[],niveau:string) : Eleve[]{

        if(!eleves || !niveau){
            return eleves;
        }
        return eleves.filter(
            eleve => eleve.niveau.toLocaleLowerCase().indexOf(niveau.toLocaleLowerCase())!==-1
            )

    }

}