package com.emailmkt.emailmarketing.model;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "workflow_has_task",uniqueConstraints={
        @UniqueConstraint(columnNames = {"workflow_id","id"})
})



//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "id")
public class Task implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "pre_task")
    private String preTask;

//    @Basic
//    @Column(name = "post_task")
//    private String postTask;

    @Basic
    @Column(name = "gateway")
    private String gateway;

    @Basic
    @Column(name = "shape_id")
    private String shape_id;

    @Basic
    @Column(name = "status")
    private String status;

    @Basic
    @Column(name = "created_time")
    private String createdTime;

    @Basic
    @Column(name = "updated_time")
    private String updatedTime;

    @Basic
    @Column(name = "type")
    private String type;

    @Basic
    @Column(name = " name")
    private String name;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "workflow_id")
    private Workflow workflow;

//    @JsonIgnore
//    @ManyToOne
//    @JoinColumns({
//            @JoinColumn(name = "task_id",referencedColumnName = "id"),
//            @JoinColumn(name = "shape_id",referencedColumnName = "shape_id")
//    })
//    private Task task;
}
