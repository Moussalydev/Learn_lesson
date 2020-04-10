package com.learning.learning.RepoMongo;

import com.learning.learning.Entities.Evaluation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;

public interface EvaluationRepository extends MongoRepository<Evaluation, BigInteger> {


}

