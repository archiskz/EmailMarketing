package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.model.Subscriber;

import java.util.List;


public interface SubscriberService {
    boolean createSubscriber(Subscriber subscriber);

    List<Subscriber> getAllSubscriber();

    Subscriber editSubscriber(Subscriber subscriber);

    List<Subscriber> getAllSubscriberByName();

    Subscriber getSubscriberByName(String name);

    List<Subscriber> getAllSubscriberById(int Id);

    Subscriber updateSubscriber(Subscriber subscriber);

    int countTotalSubscriber(int Id);

    Subscriber createSubscriber(Subscriber subscriber);

    Subscriber getSubscriberByName(String name);
}