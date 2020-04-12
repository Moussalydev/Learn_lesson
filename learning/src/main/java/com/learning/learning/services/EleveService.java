package com.learning.learning.services;

import com.learning.learning.Entities.Eleve;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.RepoMongo.EleveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

@Service
public class EleveService {

    @Autowired
    EleveRepository eleveRepository;

    public Eleve AjoutEleve(@Valid @RequestBody Eleve eleve) {

        return eleveRepository.save(eleve);
    }
    public List<Eleve> FindAllEleves() {

        return eleveRepository.findAll();
    }
    public ResponseEntity<Eleve> FindByMatricule(@PathVariable(value = "matricule") String matricule)
            throws ResourceNotFoundException {
        Eleve e = eleveRepository.findEleveByMatricule(matricule);

        return ResponseEntity.ok().body(e);
    }
}
