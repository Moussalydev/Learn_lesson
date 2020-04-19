package com.learning.learning.MongoController;

import com.learning.learning.Entities.Eleve;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.services.EleveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

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
    @GetMapping("/eleve/{matricule}")
    public ResponseEntity<Eleve> FindByMatricule(@PathVariable(value = "matricule") String matricule) throws ResourceNotFoundException {
        return eleveService.FindByMatricule(matricule);

    }
    @PutMapping("/eleve/{matricule}")
    ResponseEntity<Eleve> EditerEleve(
            @PathVariable(value = "matricule") String matricule,
            @Valid @RequestBody Eleve eleveDetails) {

        return eleveService.EditerEleve(matricule,eleveDetails);

    }
    @DeleteMapping("/eleve/{matricule}")
    public Map<String, Boolean> deleteEleve(@PathVariable(value = "matricule") String matricule)
            throws ResourceNotFoundException {
        return eleveService.deleteEleve(matricule);

    }
    @GetMapping("/nombre-eleve")
    public long NombreElevesDelaClasse(
            @RequestParam String niveau
    ){
        return eleveService.NombreEleves(niveau);

    }
}
