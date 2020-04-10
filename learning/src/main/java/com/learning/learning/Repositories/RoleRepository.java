package com.learning.learning.Repositories;

import com.learning.learning.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query("select u.id, u.username, u.email, r.userid,r.name from User as u, Role as r where u.id = r.userid and u.username =?1")
    Optional<Object> FindRoles(String username);
}
