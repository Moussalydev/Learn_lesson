package com.learning.learning.Entities;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigInteger;

@Document(collection = "examens")
public class Examen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;
    private Eleve eleve;
    private Speciality speciality;
    private double notedevoir;
    private double note;
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
                ", note=" + note +
                ", semestre=" + semestre +
                '}';
    }
}
