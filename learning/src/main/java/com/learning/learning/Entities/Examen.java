package com.learning.learning.Entities;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Date;

@Document(collection = "examens")
public class Examen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;
    private Eleve eleve;
    private Speciality speciality;
    @Min(0)
    @Max(20)
    private double notedevoir;

    private LocalDate dateExamen;
    @Min(0)
    @Max(20)
    private double note;
    private double total;
    private SemesterType semestre;

    public BigInteger getId() {
        return id;
    }

    public double getNotedevoir() {
        return notedevoir;
    }

    public void setNotedevoir(double notedevoir) {
        this.notedevoir = notedevoir;
    }

    public LocalDate getDateExamen() {
        return dateExamen;
    }

    public void setDateExamen(LocalDate dateExamen) {
        this.dateExamen = dateExamen;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public Eleve getEleve() {
        return eleve;
    }

    public void setEleve(Eleve eleve) {
        this.eleve = eleve;
    }

    public Speciality getSpeciality() {
        return speciality;
    }

    public void setSpeciality(Speciality speciality) {
        this.speciality = speciality;
    }

    public double getNote() {
        return note;
    }

    public void setNote(double note) {
        this.note = note;
    }

    public SemesterType getSemestre() {
        return semestre;
    }

    public void setSemestre(SemesterType semestre) {
        this.semestre = semestre;
    }

    @Override
    public String toString() {
        return "Examen{" +
                "id=" + id +
                ", eleve=" + eleve +
                ", speciality=" + speciality +
                ", notedevoir=" + notedevoir +
                ", dateExamen=" + dateExamen +
                ", note=" + note +
                ", total=" + total +
                ", semestre=" + semestre +
                '}';
    }
}
