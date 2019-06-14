package com.emailmkt.emailmarketing.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "group_contact_has_subcriber")
public class GroupContactSubcriber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Basic
    @Column(name = "created_time")
    private String createdTime;

    @Basic
    @Column(name = "updated_time")
    private String updatedTime;

//    @Basic
//    @Column(name = "subcriber_id")
//    private String subcriberId;

    @ManyToOne
    @JoinColumn(name = "subcriber_id")
    private Subcriber subcriber;

//    @Basic
//    @Column(name = "group_contact_id")
//    private String groupContactId;

    @ManyToOne
    @JoinColumn(name = "group_contact_id")
    private GroupContact groupContact;


}
