package com.emailmkt.emailmarketing.model;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
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
@Table(name = "campaign_has_subcriber"
//        uniqueConstraints={@UniqueConstraint(columnNames = { "group_contact_id","subcriber_email"})}

)
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "id")
public class CampaignSubcriber implements Serializable {
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



    //    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id",referencedColumnName = "campaign_id")
    private CampaignGroupContact campaignGroupContact;




}