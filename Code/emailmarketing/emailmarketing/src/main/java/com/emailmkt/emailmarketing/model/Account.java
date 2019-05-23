package com.emailmkt.emailmarketing.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Account implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "username")
    private String username;

    @Basic
    @Column(name = "fullname")
    private String fullname;

    @Basic
    @Column(name = "email")
    private String email;

    @Basic
    @Column(name = "password")
    private String password;



    @Basic
    @Column(name = "phone")
    private String phone;

    @Basic
    @Column(name = "gender")
    private String gender;

    @Basic
    @Column(name = "address")
    private String address;

    @Basic
    @Column(name = "role_id")
    private Integer roleId;

    @Basic
    @Column(name = "createdTime")
    private String createdTime;

    @Basic
    @Column(name = "updatedTime")
    private String updatedTime;



}
