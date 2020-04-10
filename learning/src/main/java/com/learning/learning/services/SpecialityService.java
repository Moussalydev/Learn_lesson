package com.learning.learning.services;

import com.learning.learning.Entities.Speciality;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.Repositories.SpecialityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

@Service
public class SpecialityService {
    @Autowired
    SpecialityRepository specialityRepository;

    public List<Speciality> FindAllSubjects() {

        return specialityRepository.findAll();
    }

    public Speciality createSubjecct(@Valid @RequestBody Speciality speciality) {

        return specialityRepository.save(speciality);
    }

    public ResponseEntity<Speciality> EditSubject(@PathVariable(value = "id") Long specialityId,
                                                     @Valid @RequestBody Speciality specialityDetails) throws ResourceNotFoundException {
        Speciality speciality = specialityRepository.findById(specialityId)
                .orElseThrow(() -> new ResourceNotFoundException("Matiere non renseignée " + specialityId));

        speciality.setNom_speciality(specialityDetails.getNom_speciality());
        speciality.setCoef(specialityDetails.getCoef());

        final Speciality updatedSpeciality = specialityRepository.save(speciality);
        return ResponseEntity.ok(updatedSpeciality);
    }




}
