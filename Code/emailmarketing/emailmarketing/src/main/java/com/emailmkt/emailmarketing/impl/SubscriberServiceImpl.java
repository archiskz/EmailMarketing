package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.model.Subscriber;
import com.emailmkt.emailmarketing.repository.SubscriberRepository;
import com.emailmkt.emailmarketing.service.SubscriberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class SubscriberServiceImpl implements SubscriberService {

    @Autowired
    AccountRepository subscriberRepository;

    @Override
    public boolean addSubscriber(Subscriber subscriber) {
        System.out.println(subscriber.getId());
        Subscriber checkExistedSubscriber = subscriberRepository.findById(subscriber.getId());
        if (checkExistedSubscriber != null) {
            return false;
        }
        subscriber.setCreatedTime(LocalDateTime.now().toString());
        subscriber.setPassword(account.getPassword());
        subscriberRepository.save(subscriber);
        return true;
    }

    @Override
    public List<subscriber> getAllSubscriber() {
        System.out.println("toi day chưa ahihihi");
        return subscriberRepository.findAll();
    }

    @Override
    public Account editSubscriber(subscriber subscriber) {
        try {
            subscriber checkExistedsubscriber = subscriberRepository.findsubscriberById(subscriber.getId());
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
    public subscriber updatesubscriber(Subscriber subscriber) {
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

