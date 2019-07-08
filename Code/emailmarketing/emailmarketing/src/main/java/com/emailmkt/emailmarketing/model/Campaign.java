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

public class Campaign implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "name")
    private String name;


    @Column(name = "status")
    private String status;


    @Column(name = "type")
    private String type;

    @Column(name = "recurring")
    private String recurring;


    @Column(name = "timestart")
    private String timeStart;




    @Column(name = "content")
    private String content;

    @Column(name = "body_json")
    private String bodyJson;


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

    @OneToMany( mappedBy = "campaign",cascade = CascadeType.ALL)
    private List<CampaignGroupContact> campaignGroupContacts;

    @Column(name = "account_id")
    private Integer account_id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private Account account;


}
