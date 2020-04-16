package com.learning.learning.services;

import com.learning.learning.Entities.Evaluation;
import com.learning.learning.Entities.Examen;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.RepoMongo.ExamenRepository;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public Examen NoteExamen(String matricule,String matiere, String semestre){
        Query query = new Query();
        query.addCriteria(
                Criteria.where("eleve.matricule").is(matricule)
                .and("semestre").is(semestre)
                .and("speciality.nom_speciality").is(matiere)
        );

        return mongoTemplate.find(query, Examen.class).get(0);
    }

    public ResponseEntity<Examen> Editer_examen(
            String matricule,
            String matiere,
            String semestre,
            Examen examenDetails)

            throws ResourceNotFoundException {
        Examen examen = NoteExamen(
                matricule,matiere,semestre);

        examen.setNotedevoir(examenDetails.getNotedevoir());
        examen.setTotal(examenDetails.getTotal());

        final Examen updatedExamen = examenRepository.save(examen);
        return ResponseEntity.ok(updatedExamen);
    }


    public Examen TrouverExamen(String matricule,String matiere,String semestre){
         return NoteExamen(matricule,matiere,semestre);

    }
    public Map<String, Boolean> deleteNoteExamen(
            String matricule,
            String matiere,
            String semestre

    )

            throws ResourceNotFoundException {

        Examen examen = NoteExamen(matricule,matiere,semestre);
        //.orElseThrow(() -> new ResourceNotFoundException("Devoir non disponible" + evalid));

        examenRepository.delete(examen);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    public ResponseEntity<List<Examen>> FindByMatricule(String matricule)
            throws ResourceNotFoundException {
        List<Examen> examen = examenRepository.findExamenByEleve_Matricule(matricule);

        return ResponseEntity.ok().body(examen);
    }

    public Examen TotalSemestre(String matricule,String semestre){

        GroupOperation groupByStateAndSumPop = group("id")
                .sum("total").as("total");
        Aggregation aggregation = newAggregation(

                match(
                        new Criteria("eleve.matricule").is(matricule)
                                .and("semestre").is(semestre)

                ),

                groupByStateAndSumPop);
        AggregationResults<Examen> result = mongoTemplate.aggregate(
                aggregation, "examens", Examen.class);

        return result.getMappedResults().get(0);
    }
    public Examen TotalCoefSemestre(String matricule,String semestre){

        GroupOperation groupByStateAndSumPop = group("id")
                .sum("speciality.coef").as("coef");
        Aggregation aggregation = newAggregation(

                match(
                        new Criteria("eleve.matricule").is(matricule)
                                .and("semestre").is(semestre)

                ),

                groupByStateAndSumPop);
        AggregationResults<Examen> result = mongoTemplate.aggregate(
                aggregation, "examens", Examen.class);

        return result.getMappedResults().get(0);
    }

}
