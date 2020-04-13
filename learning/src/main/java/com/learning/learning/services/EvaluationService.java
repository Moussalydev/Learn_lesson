package com.learning.learning.services;

import com.learning.learning.Entities.Evaluation;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.RepoMongo.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;



import javax.validation.Valid;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;


@Service
public class EvaluationService {

    @Autowired
    EvaluationRepository evaluationRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public Evaluation Evaluer(@Valid @RequestBody Evaluation evaluation) {

        return evaluationRepository.save(evaluation);
    }
    public List<Evaluation> FindAllEvaluations() {

        return evaluationRepository.findAll();
    }

    public List<Evaluation> CumulDevoir(String matricule,String matiere, String semestre){

        GroupOperation groupByStateAndSumPop = group("id")
                .avg("note").as("note");
        Aggregation aggregation = newAggregation(

                match(
                  new Criteria("eleve.matricule").is(matricule)
                          .and("semestre").is(semestre)
                          .and("speciality.nom_speciality").is(matiere)
                ),

                groupByStateAndSumPop);
        AggregationResults<Evaluation> result = mongoTemplate.aggregate(
                aggregation, "evaluations", Evaluation.class);

        return result.getMappedResults();
    }
    public ResponseEntity<List<Evaluation>> FindByMatricule(String matricule)
            throws ResourceNotFoundException {
        List<Evaluation> evaluation = evaluationRepository.findEvaluationByEleve_Matricule(matricule);

        return ResponseEntity.ok().body(evaluation);
    }

    public ResponseEntity<Optional<Evaluation>> FindById(BigInteger matricule)
            throws ResourceNotFoundException {
        Optional<Evaluation> evaluation = evaluationRepository.findById(matricule);

        return ResponseEntity.ok().body(evaluation);
    }
    public Map<String, Boolean> deleteNote(BigInteger evalid)
            throws ResourceNotFoundException {
        Evaluation evaluation = evaluationRepository.findById(evalid)
                .orElseThrow(() -> new ResourceNotFoundException("Devoir non disponible" + evalid));

        evaluationRepository.delete(evaluation);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }





}
