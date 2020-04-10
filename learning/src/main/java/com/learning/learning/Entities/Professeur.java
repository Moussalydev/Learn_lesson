package com.learning.learning.Entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "professeurs")
public class Professeur {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String prenom;
    private String nom;
    private String email;
    private String telephone;

    @OneToMany(mappedBy = "professeurid", cascade = CascadeType.ALL)
    private Set<Speciality> speciality;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Set<Speciality> getSpeciality() {
        return speciality;
    }

    public void setSpeciality(Set<Speciality> speciality) {
        this.speciality = speciality;
    }

    @Override
    public String toString() {
        return "Professeur{" +
                "id=" + id +
                ", prenom='" + prenom + '\'' +
                ", nom='" + nom + '\'' +
                ", email='" + email + '\'' +
                ", telephone='" + telephone + '\'' +
                ", speciality=" + speciality +
                '}';
    }
}
