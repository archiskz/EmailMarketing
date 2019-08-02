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
@Table(name = "appointment_has_subcriber"
//        uniqueConstraints={@UniqueConstraint(columnNames = { "group_contact_id","subcriber_email"})}

)
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "id")
public class AppointmentSubcriber implements Serializable {
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


    @Column(name = "subcriber_email")
    private String subcriberEmail;

    @Column(name = "confirmation")
    private boolean confirmation;



    @Column(name = "opened")
    private boolean opened;

    @Column(name = "send")
    private boolean send;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id",referencedColumnName = "appointment_id")
    private AppointmentGroupContact appointmentGroupContact;




}