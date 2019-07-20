package com.emailmkt.emailmarketing.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "task",uniqueConstraints={
        @UniqueConstraint(columnNames = {"id", "shape_id"})
        })
public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "shape_id")
    private String shape_id;

    @OneToMany(  cascade = CascadeType.ALL)
    @JoinColumn(name = "shape_id")
    private List<WorkflowTask> workflowTasks;


}
