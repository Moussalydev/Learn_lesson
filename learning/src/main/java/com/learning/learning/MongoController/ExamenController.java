package com.learning.learning.MongoController;

import com.learning.learning.Entities.Examen;
import com.learning.learning.Exception.ResourceNotFoundException;
import com.learning.learning.services.ExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

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
    public Examen NoteExamen(
            @RequestParam String matricule,
            @RequestParam String matiere,
            @RequestParam String semestre
    )
    {
        return examenService.TrouverExamen(matricule,matiere,semestre);


    }
    @PutMapping("/note-examen")
    public ResponseEntity<Examen> Editer_examen(
            @RequestParam String matricule,
            @RequestParam String matiere,
            @RequestParam String semestre,
            @Valid @RequestBody Examen examenDetails)

            throws ResourceNotFoundException {
        return examenService.Editer_examen(matricule,matiere,semestre,examenDetails);

    }
    @DeleteMapping("/delete-exam")
    public Map<String, Boolean> deleteNote(
            @RequestParam String matricule,
            @RequestParam String matiere,
            @RequestParam String semestre
    ) throws ResourceNotFoundException {
        return examenService.deleteNoteExamen(matricule,matiere,semestre);

    }
    @GetMapping("/examen/{eleve.matricule}")
    public ResponseEntity<List<Examen>> FindEleve(@PathVariable(value = "eleve.matricule") String matricule) throws ResourceNotFoundException {
        return examenService.FindByMatricule(matricule);

    }

    @GetMapping("/total-notes")
    public Examen CumulEvaluationSemester(
            @RequestParam String matricule,
            @RequestParam String semestre
    )
    {
        return examenService.TotalSemestre(matricule,semestre);

    }
    @GetMapping("/total-coef")
    public Examen CumulTotalCoefSemester(
            @RequestParam String matricule,
            @RequestParam String semestre
    )
    {
        return examenService.TotalCoefSemestre(matricule,semestre);

    }
}
