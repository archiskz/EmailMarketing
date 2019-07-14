package com.emailmkt.emailmarketing.model;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "workflow_has_task",uniqueConstraints={
        @UniqueConstraint(columnNames = {"workflow_id", "task_id"})
}

)
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "id")
public class WorkflowTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "pre_task")
    private String preTask;

    @Basic
    @Column(name = "post_task")
    private String postTask;

    @Column(name = "condition")
    private String condition;

    @Basic
    @Column(name = "status")
    private String status;

    @Basic
    @Column(name = "created_time")
    private String createdTime;

    @Basic
    @Column(name = "updated_time")
    private String updatedTime;


    @ManyToOne
    @JoinColumn(name = "workflow_id")
    private Workflow workflow;

//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "task_id" )
    private Task task;

}
