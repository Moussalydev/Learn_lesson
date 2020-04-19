package com.learning.learning.MongoController;

import com.learning.learning.Entities.Bulletinone;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.services.BulletinOneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("${app.api}")
@RestController
public class BulletinOneController {

    @Autowired
    BulletinOneService bulletinOneService;

    @PostMapping("/ajout-moyenne-first")
    public Bulletinone AjoutMoyenne(@Valid @RequestBody Bulletinone bulletinone) {

        return bulletinOneService.PosterBulletin(bulletinone);
    }
    @GetMapping("/moyenne-first/{matricule}")
    public ResponseEntity<Bulletinone> FindByMatricule(@PathVariable(value = "matricule") String matricule) throws ResourceNotFoundException {
        return bulletinOneService.FindBulletinByMatricule(matricule);

    }
    @GetMapping("/nombre-bulletin-sem1")
    public long NombreBulletinSemestreOne(
            @RequestParam String niveau
    ){
        return bulletinOneService.NombreDeBulletinSemestreOne(niveau);

    }
    @GetMapping("/moyenne-classe-sem1/{classe}")
    public Bulletinone MoyenneAverage(@PathVariable(value = "classe") String classe){
        return bulletinOneService.MoyenneAvg(classe);

    }


}
