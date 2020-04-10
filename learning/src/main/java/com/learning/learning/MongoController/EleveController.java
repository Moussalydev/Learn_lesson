package com.learning.learning.MongoController;

import com.learning.learning.Entities.Eleve;
import com.learning.learning.services.EleveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("${app.api}")
@RestController
public class EleveController {
    @Autowired
    EleveService eleveService;

    @PostMapping("/add-eleve")
    public Eleve AjouterEleve(@Valid @RequestBody Eleve eleve) {

        return eleveService.AjoutEleve(eleve);
    }
    @GetMapping("/list-eleve")
    public List<Eleve> findAllEleves() {
        return eleveService.FindAllEleves();

    }
}
