package com.learning.learning.services;

import com.learning.learning.Entities.Evaluation;
import com.learning.learning.Entities.Examen;
import com.learning.learning.RepoMongo.ExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class ExamenService {

    @Autowired
    ExamenRepository examenRepository;
    @Autowired
    MongoTemplate mongoTemplate;

    public Examen EvaluerExamen(@Valid @RequestBody Examen examen) {

        return examenRepository.save(examen);
    }

    public List<Examen> FindAllExamens() {

        return examenRepository.findAll();
    }

    public List<Examen> NoteExamen(String matricule,String matiere, String semestre){
        Query query = new Query();
        query.addCriteria(
                Criteria.where("eleve.matricule").is(matricule)
                .and("semestre").is(semestre)
                .and("speciality.nom_speciality").is(matiere)
        );

        return mongoTemplate.find(query, Examen.class);
    }

}
