package com.learning.learning.MongoController;

import com.learning.learning.Entities.Examen;
import com.learning.learning.services.ExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("${app.api}")
@RestController
public class ExamenController {
    @Autowired
    ExamenService examenService;

    @PostMapping("/add-examen")
    public Examen ajoutNoteExamen(@Valid @RequestBody Examen examen) {

        return examenService.EvaluerExamen(examen);
    }
    @GetMapping("/list-examen")
    public List<Examen> findExamens() {
        return examenService.FindAllExamens();

    }
    @GetMapping("/note-examen")
    public List<Examen> NoteExamen(
            @RequestParam String matricule,
            @RequestParam String matiere,
            @RequestParam String semestre
    )
    {
        return examenService.NoteExamen(matricule,matiere,semestre);


    }
}
