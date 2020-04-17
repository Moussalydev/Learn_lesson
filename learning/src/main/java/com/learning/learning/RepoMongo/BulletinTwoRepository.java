package com.learning.learning.RepoMongo;

import com.learning.learning.Entities.Bulletintwo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;

public interface BulletinTwoRepository extends MongoRepository<Bulletintwo, BigInteger> {

    Bulletintwo findBulletintwosByEleve_Matricule(String matricule);
}
