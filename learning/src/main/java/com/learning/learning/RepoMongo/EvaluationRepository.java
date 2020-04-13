package com.learning.learning.RepoMongo;

import com.learning.learning.Entities.Evaluation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;
import java.util.List;

public interface EvaluationRepository extends MongoRepository<Evaluation, BigInteger> {

    List<Evaluation> findEvaluationByEleve_Matricule(String matricule);


}

