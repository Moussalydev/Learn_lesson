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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Map<String, Boolean> deleteEleve(String matricule)
            throws ResourceNotFoundException {
        Eleve eleve = eleveRepository.findEleveByMatricule(matricule);
               // .orElseThrow(() -> new ResourceNotFoundException("Eleve non inscris pour cet identifiant :: " + studentId));

        eleveRepository.delete(eleve);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    public ResponseEntity<Eleve> EditerEleve(String matricule,Eleve eleveDetails)  {

        Eleve eleve = eleveRepository.findEleveByMatricule(matricule);
        eleve.setMatricule(eleveDetails.getMatricule());
        eleve.setPrenom(eleveDetails.getPrenom());
        eleve.setNom(eleveDetails.getNom());
        eleve.setDateNaissance(eleveDetails.getDateNaissance());
        eleve.setLieuNaissance(eleveDetails.getLieuNaissance());
        eleve.setNiveau(eleveDetails.getNiveau());

        final Eleve updatedEleve = eleveRepository.save(eleve);


        return ResponseEntity.ok(updatedEleve);
    }

}
