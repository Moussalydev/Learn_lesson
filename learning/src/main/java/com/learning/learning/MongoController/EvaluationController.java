package com.learning.learning.MongoController;

import com.learning.learning.Entities.Evaluation;
import com.learning.learning.services.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;



import org.springframework.data.mongodb.core.MongoTemplate;


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
    public List<Evaluation> CumulEvaluationSemester1(
            @RequestParam String matricule,
            @RequestParam String matiere,
            @RequestParam String semestre
    )
    {
        return evaluationService.CumulDevoir(matricule,matiere,semestre);

    }


}
