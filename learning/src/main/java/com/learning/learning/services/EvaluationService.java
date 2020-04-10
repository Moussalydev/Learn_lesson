package com.learning.learning.services;

import com.learning.learning.Entities.Eleve;
import com.learning.learning.Entities.Evaluation;
import com.learning.learning.RepoMongo.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

@Service
public class EvaluationService {

    @Autowired
    EvaluationRepository evaluationRepository;

    public Evaluation Evaluer(@Valid @RequestBody Evaluation evaluation) {

        return evaluationRepository.save(evaluation);
    }
    public List<Evaluation> FindAllEvaluations() {

        return evaluationRepository.findAll();
    }


}
