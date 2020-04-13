package com.learning.learning.MongoController;

import com.learning.learning.Entities.Evaluation;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.services.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RequestMapping("${app.api}")
@RestController
public class EvaluationController {

    @Autowired
    EvaluationService evaluationService;



    @PostMapping("/add-evaluation")
    public Evaluation ajouterEvaluation(@Valid @RequestBody Evaluation evaluation) {

        return evaluationService.Evaluer(evaluation);
    }
    @GetMapping("/list-evaluation")
    public List<Evaluation> findAllEvaluation() {
        return evaluationService.FindAllEvaluations();

    }
    @GetMapping("/cumul")
    public List<Evaluation> CumulEvaluationSemester(
            @RequestParam String matricule,
            @RequestParam String matiere,
            @RequestParam String semestre
    )
    {
        return evaluationService.CumulDevoir(matricule,matiere,semestre);

    }
    @GetMapping("/evaluation/{eleve.matricule}")
    public ResponseEntity<List<Evaluation>> FindEleve(@PathVariable(value = "eleve.matricule") String matricule) throws ResourceNotFoundException {
        return evaluationService.FindByMatricule(matricule);

    }
    @GetMapping("/devoir/{id}")
    public ResponseEntity<Optional<Evaluation>> FindEleve(@PathVariable(value = "id") BigInteger id) throws ResourceNotFoundException {
        return evaluationService.FindById(id);

    }
    @DeleteMapping("/delete-eval/{id}")
    public Map<String, Boolean> deleteNote(BigInteger id) throws ResourceNotFoundException {
        return evaluationService.deleteNote(id);

    }




}
