package com.learning.learning.services;

import com.learning.learning.Entities.Evaluation;
import com.learning.learning.Entities.Examen;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.RepoMongo.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


import javax.validation.Valid;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

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

    public Evaluation CumulDevoir(String matricule,String matiere, String semestre){

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

        return result.getMappedResults().get(0);
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
    public Map<String, Boolean> deleteNote(
            String matricule,
            String matiere,
            String semestre,
            String date
        )

            throws ResourceNotFoundException {

        Evaluation evaluation = FindDevoirDate(matricule,matiere,semestre,date);
                //.orElseThrow(() -> new ResourceNotFoundException("Devoir non disponible" + evalid));

        evaluationRepository.delete(evaluation);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }


    public Evaluation FindDevoirDate(String matricule, String matiere, String semestre, String date){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-dd");
        LocalDate ldate = LocalDate.parse(date, formatter);

        Query query = new Query();
        query.addCriteria(
                Criteria.where("eleve.matricule").is(matricule)
                        .and("semestre").is(semestre)
                        .and("speciality.nom_speciality").is(matiere)
                        .and("date").is(ldate)
        );

        return mongoTemplate.find(query, Evaluation.class).get(0);
    }
    public ResponseEntity<Evaluation> Editer_evaluation(
            String matricule,
            String matiere,
            String semestre,
            String date,
            Examen evaluationDetails)

            throws ResourceNotFoundException {
        Evaluation evaluation = FindDevoirDate(
                matricule,matiere,semestre,date);
        evaluation.setNote(evaluationDetails.getNote());

        final Evaluation updatedEvaluation = evaluationRepository.save(evaluation);
        return ResponseEntity.ok(updatedEvaluation);
    }






}
