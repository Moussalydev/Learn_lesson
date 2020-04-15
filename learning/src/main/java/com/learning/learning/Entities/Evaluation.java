package com.learning.learning.Entities;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Date;

@Document(collection = "evaluations")
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;
    private Eleve eleve;
    private Speciality speciality;
    private double note;
    private LocalDate date;
    private SemesterType semestre;

    public BigInteger getId() {
        return id;
    }

    public double getNote() {
        return note;
    }

    public void setNote(double note) {
        this.note = note;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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

    public SemesterType getSemestre() {
        return semestre;
    }

    public void setSemestre(SemesterType semestre) {
        this.semestre = semestre;
    }

    @Override
    public String toString() {
        return "Evaluation{" +
                "id=" + id +
                ", eleve=" + eleve +
                ", speciality=" + speciality +
                ", note=" + note +
                ", date=" + date +
                ", semestre=" + semestre +
                '}';
    }
}
