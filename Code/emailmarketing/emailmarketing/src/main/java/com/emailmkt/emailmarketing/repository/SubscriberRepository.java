package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Subscriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriberRepository extends JpaRepository<Subscriber, Integer> {
    Subscriber findByName(String Name);

    List<Subscriber> findAllByIDGreaterThanEqual(int id);



    Subscriber findSubscriberById(Integer id);

    Subscriber findSubscriberByName(String name);

    Subscriber findSubscriberByEmail(String email);

    Subscriber findSubscriberByStatus(String status);

    List<Subscriber> findAllByIdOrder(int Id);
    int countAllById(int Id);


}