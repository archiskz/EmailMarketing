package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.model.Subscriber;
import com.emailmkt.emailmarketing.service.SubscriberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static javax.security.auth.callback.ConfirmationCallback.OK;
import static org.springframework.http.HttpStatus.*;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
public class SubscriberController {
    public static final String BASE_URK = "subscriber";
    private static final Logger LOGGER = LoggerFactory.getLogger(SubscriberController.class);
    @Autowired
    SubscriberService subscriberService;
    private Subscriber subscriberEdited;

    @GetMapping("/subscriber")
    public List<Subscriber> getAllSubscriber() {
        return subscriberService.getAllSubscriber();
    }

    @PostMapping("add")
    public ResponseEntity addSubscriber(@RequestBody Subscriber subscriber) {
        boolean flag = subscriberService.addSubscriber(subscriber);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Subscriber này đã tồn tại");
        }
        return ResponseEntity.status(CREATED).body("Đã thêm Subscriber thành công");

    }
    @PutMapping("edit")
    public ResponseEntity updateSubscriber(@RequestBody Subscriber Subscriber) {
        Subscriber SubscriberEdited = new SubscriberService(subscriberEdited) {
            @Override
            public boolean createSubscriber(com.emailmkt.emailmarketing.model.Subscriber subscriber) {
                return false;
            }

            @Override
            public List<com.emailmkt.emailmarketing.model.Subscriber> ediSubscribers() {
                return null;
            }

            @Override
            public List<com.emailmkt.emailmarketing.model.Subscriber> getAllSubscriber() {
                return null;
            }

            @Override
            public com.emailmkt.emailmarketing.model.Subscriber editEmail(com.emailmkt.emailmarketing.model.Subscriber email) {
                return null;
            }

            @Override
            public List<com.emailmkt.emailmarketing.model.Subscriber> getAllSubscriberByName() {
                return null;
            }

            @Override
            public List<com.emailmkt.emailmarketing.model.Subscriber> getAllSubscriberByStatus() {
                return null;
            }

            @Override
            public com.emailmkt.emailmarketing.model.Subscriber getSubscriberByStatus(String status) {
                return null;
            }

            @Override
            public List<com.emailmkt.emailmarketing.model.Subscriber> getAllSubscriberById(int Id) {
                return null;
            }

            @Override
            public com.emailmkt.emailmarketing.model.Subscriber updateSubscriber(com.emailmkt.emailmarketing.model.Subscriber subscriber) {
                return null;
            }

            @Override
            public com.emailmkt.emailmarketing.model.Subscriber editSubscriber(com.emailmkt.emailmarketing.model.Subscriber subscriber) {
                return null;
            }

            @Override
            public com.emailmkt.emailmarketing.model.Subscriber updatesubscriber(com.emailmkt.emailmarketing.model.Subscriber subscriber) {
                return null;
            }

            @Override
            public int countTotalSubscriber(int Id) {
                return 0;
            }

            @Override
            public com.emailmkt.emailmarketing.model.Subscriber getSubscriberByName(String name) {
                return null;
            }

            @Override
            public boolean addSubscriber(com.emailmkt.emailmarketing.model.Subscriber subscriber) {
                return false;
            }

            @Override
            public com.emailmkt.emailmarketing.model.Subscriber createNewSubscriber(com.emailmkt.emailmarketing.model.Subscriber subscriber) {
                return null;
            }
        };
        if (SubscriberEdited != null) {
            return ResponseEntity.status(OK).body(subscriberEdited);
        }
        return ResponseEntity.status(NOT_FOUND).body("Subscriber này không tồn tại");
    }
    @GetMapping("update/{id}")
    public Subscriber getAllSubscriber(@PathVariable(value = "id") int id) {
        return subscriberService.getSubscriberByName(toString());
    }

    @GetMapping("getAllAccountByStatus")
    public List<Subscriber> getAllAccountByStatus(@RequestParam(value = "Status") String Status) {
        return subscriberService.getAllSubscriberByStatus();
    }


}