package com.learning.learning.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private RoleType name;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private User userid;

    @JsonIgnore
    public User getUserid() {
        return userid;
    }
    @JsonProperty
    public void setUserid(User userid) {
        this.userid = userid;
    }

    public Role() {

    }

    public Role(RoleType name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleType getName() {
        return name;
    }

    public void setName(RoleType name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name=" + name +
                ", userid=" + userid +
                '}';
    }
}
