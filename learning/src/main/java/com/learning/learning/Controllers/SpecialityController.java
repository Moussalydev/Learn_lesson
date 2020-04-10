package com.learning.learning.Controllers;

import com.learning.learning.Entities.Speciality;
import com.learning.learning.services.SpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
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




}
