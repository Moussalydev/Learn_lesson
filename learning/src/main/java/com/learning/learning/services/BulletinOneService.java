package com.learning.learning.services;

import com.learning.learning.Entities.Bulletinone;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.RepoMongo.BulletinOneRepository;
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
public class BulletinOneService {

    @Autowired
    BulletinOneRepository bulletinOneRepository;
    @Autowired
    MongoTemplate mongoTemplate;

    public Bulletinone PosterBulletin(Bulletinone bulletinone) {

        return bulletinOneRepository.save(bulletinone);
    }

    public List<Bulletinone> AfficherBulletin() {

        return bulletinOneRepository.findAll();
    }
    public ResponseEntity<Bulletinone> FindBulletinByMatricule(String matricule)
            throws ResourceNotFoundException {
        Bulletinone e = bulletinOneRepository.findBulletinoneByEleve_Matricule(matricule);

        return ResponseEntity.ok().body(e);
    }
    public long NombreDeBulletinSemestreOne(String niveau) {
        Query query = new Query();
        query.addCriteria(
                Criteria.where("classe").is(niveau)
        );
        return mongoTemplate.count(query, Bulletinone.class);
    }
    public Bulletinone MoyenneAvg(String classe){

        GroupOperation groupByStateAndSumPop = group("id")
                .avg("moyenne").as("moyenne");
        Aggregation aggregation = newAggregation(

                match(
                        new Criteria(
                                "classe").is(classe)

                ),

                groupByStateAndSumPop);
        AggregationResults<Bulletinone> result = mongoTemplate.aggregate(
                aggregation, "bulletinone", Bulletinone.class);

        return result.getMappedResults().get(0);
    }


}
