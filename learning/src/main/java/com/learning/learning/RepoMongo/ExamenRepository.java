package com.learning.learning.RepoMongo;

import com.learning.learning.Entities.Examen;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.math.BigInteger;
import java.util.List;


public interface ExamenRepository extends MongoRepository<Examen, BigInteger> {

    List<Examen> findExamenByEleve_Matricule(String matricule);

}
