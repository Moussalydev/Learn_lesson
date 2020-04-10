package com.learning.learning.MongoController;

import com.learning.learning.Entities.Eleve;
import com.learning.learning.services.EleveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequestMapping("${app.api}")
@RestController
public class EleveController {
    @Autowired
    EleveService eleveService;

    @PostMapping("/add")
    public Eleve AjouterEleve(@Valid @RequestBody Eleve eleve) {
        return eleveService.AjoutEleve(eleve);
    }
}
