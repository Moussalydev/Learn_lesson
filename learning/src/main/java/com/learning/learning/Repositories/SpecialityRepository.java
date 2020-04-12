package com.learning.learning.Repositories;

import com.learning.learning.Entities.Speciality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SpecialityRepository extends JpaRepository<Speciality, Long> {

    @Query("select s from Speciality as s where s.nom_speciality =?1")
    Speciality findSpeciality(String nom_speciality);
}
