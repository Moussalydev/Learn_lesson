package com.learning.learning.RepoMongo;

import com.learning.learning.Entities.Bulletinone;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;

public interface BulletinOneRepository extends MongoRepository<Bulletinone, BigInteger> {

    Bulletinone findBulletinoneByEleve_Matricule(String matricule);
}
