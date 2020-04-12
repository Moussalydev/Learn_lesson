package com.learning.learning.Controllers;

import com.learning.learning.Entities.Speciality;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.services.SpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("${app.api}")
public class SpecialityController {

    @Autowired
    SpecialityService specialityService;

    @GetMapping("/list-subject")
    public List<Speciality> FindAllSubjects() {
        return specialityService.FindAllSubjects();

    }

    @PostMapping("/add-subject")
    public Speciality addSubject(@Valid @RequestBody Speciality speciality) {

        return specialityService.createSubjecct(speciality);
    }
    @GetMapping("/subject/{nom_speciality}")
    public ResponseEntity<Speciality> FindByName(@PathVariable(value = "nom_speciality") String nom_speciality) throws ResourceNotFoundException {
        return specialityService.FindByName(nom_speciality);

    }



}
