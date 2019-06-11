package com.emailmkt.emailmarketing.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Group implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Basic
    @Column(name = "name")
    private String name;


    @Basic
    @Column(name = "description")
    private String description;

    @Basic
    @Column(name = "createdTime")
    private String createdTime;

    @Basic
    @Column(name = "updatedTime")
    private String updatedTime;





}