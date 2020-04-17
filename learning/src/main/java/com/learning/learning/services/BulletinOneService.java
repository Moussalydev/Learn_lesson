package com.learning.learning.services;

import com.learning.learning.Entities.Bulletinone;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.RepoMongo.BulletinOneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BulletinOneService {

    @Autowired
    BulletinOneRepository bulletinOneRepository;

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


}
