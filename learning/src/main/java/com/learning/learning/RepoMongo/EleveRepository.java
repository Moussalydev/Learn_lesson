package com.learning.learning.RepoMongo;

import com.learning.learning.Entities.Eleve;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;

public interface EleveRepository extends MongoRepository<Eleve, BigInteger> {


}
