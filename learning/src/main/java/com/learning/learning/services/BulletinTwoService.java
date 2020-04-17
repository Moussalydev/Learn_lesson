package com.learning.learning.services;

import com.learning.learning.Entities.Bulletintwo;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.RepoMongo.BulletinTwoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BulletinTwoService {
    @Autowired
    BulletinTwoRepository bulletinTwoRepository;

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
}
