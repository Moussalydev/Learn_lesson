package com.learning.learning.services;

import com.learning.learning.Entities.Bulletintwo;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.RepoMongo.BulletinTwoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class BulletinTwoService {
    @Autowired
    BulletinTwoRepository bulletinTwoRepository;
    @Autowired
    MongoTemplate mongoTemplate;

    public Bulletintwo PosterBulletin(Bulletintwo bulletintwo) {

        return bulletinTwoRepository.save(bulletintwo);
    }

    public List<Bulletintwo> AfficherBulletin() {

        return bulletinTwoRepository.findAll();
    }
    public ResponseEntity<Bulletintwo> FindBulletinByMatricule(String matricule)
            throws ResourceNotFoundException {
        Bulletintwo e = bulletinTwoRepository.findBulletintwosByEleve_Matricule(matricule);

        return ResponseEntity.ok().body(e);
    }
    public long NombreDeBulletinSemestreTwo(String niveau) {
        Query query = new Query();
        query.addCriteria(
                Criteria.where("classe").is(niveau)
        );
        return mongoTemplate.count(query, Bulletintwo.class);
    }
    public Bulletintwo MoyenneAvg(String classe){

        GroupOperation groupByStateAndSumPop = group("id")
                .avg("moyenne").as("moyenne");
        Aggregation aggregation = newAggregation(

                match(
                        new Criteria(
                                "classe").is(classe)

                ),

                groupByStateAndSumPop);
        AggregationResults<Bulletintwo> result = mongoTemplate.aggregate(
                aggregation, "bulletintwo", Bulletintwo.class);

        return result.getMappedResults().get(0);
    }

}
