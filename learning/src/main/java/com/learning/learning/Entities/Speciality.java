package com.learning.learning.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.Min;

@Entity
@Table(name = "speciality")
public class Speciality {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String nom_speciality;
    @Min(1)
    private Integer coef;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private Professeur professeurid;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom_speciality() {
        return nom_speciality;
    }

    public void setNom_speciality(String nom_speciality) {
        this.nom_speciality = nom_speciality;
    }

    public Integer getCoef() {
        return coef;
    }

    public void setCoef(Integer coef) {
        this.coef = coef;
    }


}
