package com.emailmkt.emailmarketing.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "id")
public class Subcriber implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "email")
    private String email;

    @Basic
    @Column(name = "address")
    private String address;

    @Basic
    @Column(name = "type")
    private String type;

    @Basic
    @Column(name = "tag")
    private String tag;

    @Basic
    @Column(name = "created_time")
    private String createdTime;

    @Basic
    @Column(name = "updated_time")
    private String updatedTime;

    @Basic
    @Column(name = "account_id")
    private String account_id;

    @ManyToOne
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private Account account;

    @OneToMany( mappedBy = "subcriber", cascade = CascadeType.ALL)
    private List<GroupContactSubcriber> groupContactSubcribers;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Subcriber subcriber = (Subcriber) o;
        return id == subcriber.id &&
                Objects.equals(name, subcriber.name) &&
                Objects.equals(email, subcriber.email) &&
                Objects.equals(address, subcriber.address) &&
                Objects.equals(type, subcriber.type) &&
                Objects.equals(tag, subcriber.tag) &&
                Objects.equals(createdTime, subcriber.createdTime) &&
                Objects.equals(updatedTime, subcriber.updatedTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email, address, type, tag, createdTime, updatedTime);
    }
//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {
//                    CascadeType.PERSIST,
//                    CascadeType.MERGE
//            })
////            mappedBy = "group_contact_has_subcriber")
//    private Set<GroupContact> groupContact = new HashSet<>();


}
