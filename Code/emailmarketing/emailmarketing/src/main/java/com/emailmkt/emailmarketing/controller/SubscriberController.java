package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.model.Subscriber;
import com.emailmkt.emailmarketing.service.SubscriberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
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
        Subscriber SubscriberEdited = subscriberService.editSubscriber(subscriberEdited) ;

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