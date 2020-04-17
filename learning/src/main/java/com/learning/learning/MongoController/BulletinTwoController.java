package com.learning.learning.MongoController;

import com.learning.learning.Entities.Bulletintwo;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.services.BulletinTwoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("${app.api}")
@RestController
public class BulletinTwoController {

    @Autowired
    BulletinTwoService bulletinTwoService;

    @PostMapping("/ajout-moyenne-second")
    public Bulletintwo AjoutMoyenne(@Valid @RequestBody Bulletintwo bulletintwo) {

        return bulletinTwoService.PosterBulletin(bulletintwo);
    }
    @GetMapping("/moyenne-second/{matricule}")
    public ResponseEntity<Bulletintwo> FindByMatricule(@PathVariable(value = "matricule") String matricule) throws ResourceNotFoundException {
        return bulletinTwoService.FindBulletinByMatricule(matricule);

    }
}
