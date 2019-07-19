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
@Table(name = "appointment_has_subcriber"
//        uniqueConstraints={@UniqueConstraint(columnNames = { "group_contact_id","subcriber_email"})}

)
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "id")
public class AppointmentSubcriber {
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






    @Column(name = "token")
    private String token;

    @Column(name = "subcriber_email")
    private String subcriberEmail;

    @Column(name = "confirmation")
    private boolean confirmation;



//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "group_contact_id")
    private AppointmentGroupContact appointmentGroupContact;




}
