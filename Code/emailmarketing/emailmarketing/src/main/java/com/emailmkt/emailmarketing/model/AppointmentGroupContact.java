package com.emailmkt.emailmarketing.model;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "appointment_has_group_contact",uniqueConstraints={
        @UniqueConstraint(columnNames = {"appointment_id", "group_contact_id","subcriber_id"})
}

)
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "id")
public class AppointmentGroupContact {
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

    @Column(name = "subcriber_id")
    private int subcriberId;

    @Column(name = "confirmation")
    private boolean confirmation;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "group_contact_id" )
    private GroupContact groupContact;
    @OneToMany(mappedBy = "appointmentGroupContact", cascade = CascadeType.ALL)
    private List<AppointmentSubcriber> appointmentSubcribers;

}
