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
public class Template implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "name")
    private String nameTemplate;

    @Basic
    @Column(name = "type")
    private String type;

    @Basic
    @Column(name = "content")
    private String content;

    @Basic
    @Column(name = "created_time")
    private String created_time;

    @Basic
    @Column(name = "updated_time")
    private String updated_time;
}

