package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.model.Subscriber;

import java.util.List;


public interface SubscriberService {



    boolean createSubscriber(Subscriber subscriber);

    List<Subscriber> ediSubscribers();


    List<Subscriber> getAllSubscriber();

    Subscriber editEmail(Subscriber email);

    List<Subscriber> getAllSubscriberByName();


    List<Subscriber> getAllSubscriberByStatus();

    Subscriber getSubscriberByStatus(String status);

    List<Subscriber> getAllSubscriberById(int Id);

    Subscriber updateSubscriber(Subscriber subscriber);

    Subscriber editSubscriber(Subscriber subscriber);

    Subscriber updatesubscriber(Subscriber subscriber);

    int countTotalSubscriber(int Id);

    boolean SubscriberEdited(Subscriber subscriber);

    Subscriber getSubscriberByName(String name);


    boolean addSubscriber(Subscriber subscriber);

    Subscriber createNewSubscriber(Subscriber subscriber);
}