package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.model.Subscriber;
import com.emailmkt.emailmarketing.repository.SubscriberRepository;
import com.emailmkt.emailmarketing.service.SubscriberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public abstract class SubscriberServiceImpl implements SubscriberService {

    @Autowired
    SubscriberRepository subscriberRepository;

    @Override
    public boolean addSubscriber(Subscriber subscriber) {
        System.out.println(subscriber);
        Optional<Subscriber> checkExistedSubscriber = subscriberRepository.findById(subscriber.getId());
        if (checkExistedSubscriber != null) {
            return false;
        }
        subscriberRepository.save(subscriber);
        return true;
    }

    @Override
    public boolean createSubscriber(Subscriber subscriber) {
        return false;
    }

    @Override
    public Subscriber getSubscriberByName(String name) {
        return null;
    }

    @Override
    public List<Subscriber> getAllSubscriber() {
        System.out.println("toi day chưa ahihihi");
        return subscriberRepository.findAll();
    }

    @Override
    public Subscriber editEmail(Subscriber email) {
        return null;
    }

    @Override
    public List<Subscriber> getAllSubscriberByName() {
        return null;
    }

    @Override
    public List<Subscriber> getAllSubscriberByStatus() {
        return null;
    }

    @Override
    public Subscriber getSubscriberByStatus(String status) {
        return null;
    }

    @Override
    public List<Subscriber> getAllSubscriberById(int Id) {
        return null;
    }

    @Override
    public Subscriber updateSubscriber(Subscriber subscriber) {
        return null;
    }

    @Override
    public Subscriber editSubscriber(Subscriber subscriber) {
        try {
            Subscriber checkExistedsubscriber = subscriberRepository.findSubscriberById(subscriber.getId());
            if (checkExistedsubscriber != null) {
                System.out.println("TEST");
                checkExistedsubscriber.setEmail(subscriber.getEmail());
                checkExistedsubscriber.setName(subscriber.getName());

                return subscriberRepository.save(checkExistedsubscriber);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


    @Override
    public Subscriber updatesubscriber(Subscriber subscriber) {
        return null;
    }

    @Override
    public int countTotalSubscriber(int Id) {
        return subscriberRepository.countAllById(Id);
    }

    @Override
    public Subscriber createNewSubscriber(Subscriber subscriber) {
        return subscriberRepository.save(subscriber);
    }
}

