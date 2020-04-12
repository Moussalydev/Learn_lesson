package com.learning.learning.services;

import com.learning.learning.Entities.Evaluation;
import com.learning.learning.RepoMongo.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;



import javax.validation.Valid;
import java.util.List;

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




}
