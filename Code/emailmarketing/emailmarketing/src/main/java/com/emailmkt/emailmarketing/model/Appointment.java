package com.emailmkt.emailmarketing.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

public class Appointment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "name")
    private String name;


    @Column(name = "status")
    private String status;


    @Column(name = "time")
    private String time;

    @Column(name = "body")
    private String body;

    @Column(name = "body_json")
    private String bodyJson;

    @Column(name = "message_id")
    private String messageId;

    @Column(name = "subject")
    private String subject;

    @Column(name = "from_mail")
    private String fromMail;

    @Column(name = "sender")
    private String sender;

    @Basic
    @Column(name = "created_time")
    private String createdTime;

    @Basic
    @Column(name = "updated_time")
    private String updatedTime;
    @Column(name = "token")
    private String token;


    @Column(name = "automation")
    private boolean automation;



    @OneToMany( mappedBy = "appointment",cascade = CascadeType.ALL)
    private List<AppointmentGroupContact> appointmentGroupContacts;

    @Column(name = "account_id")
    private Integer account_id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private Account account;





}
