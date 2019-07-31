package com.emailmkt.emailmarketing.impl;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.DeleteMessageRequest;
import com.amazonaws.services.sqs.model.Message;
import com.amazonaws.services.sqs.model.ReceiveMessageRequest;
import com.emailmkt.emailmarketing.model.MyMessage;
import com.emailmkt.emailmarketing.service.SQSService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;


@Component

public class SQSServiceImpl implements SQSService {
    private static final Logger log = LoggerFactory.getLogger(SQSServiceImpl.class);
    private static final String CREATE_MESSAGE_ENDPOINT_URL = "http://localhost:8080/api/messages";

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String awsRegion;

    @Value("${sqs.url}")
    private String sqsURL;

    @Override

    @Scheduled(fixedRate = 50000)
    public void getMessage() {
        final AmazonSQS sqs = AmazonSQSClientBuilder.standard().withRegion(awsRegion).withCredentials(
                new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey))).build();
        while (true) {
            log.info("Receiving messages from MyQueue.\n");
            final ReceiveMessageRequest receiveMessageRequest =
                    new ReceiveMessageRequest(sqsURL)
                            .withMaxNumberOfMessages(10)
                            .withWaitTimeSeconds(3);
            final List<Message> messages = sqs.receiveMessage(receiveMessageRequest)
                    .getMessages();
            for (final com.amazonaws.services.sqs.model.Message message : messages) {
                log.debug("Message");
                log.debug("  MessageId:     "
                        + message.getMessageId());
                log.debug("  ReceiptHandle: "
                        + message.getReceiptHandle());
                log.debug("  MD5OfBody:     "
                        + message.getMD5OfBody());
                System.out.println("  Body:          "
                        + message.getBody());
                if ((!message.getBody().isEmpty())) {
                    System.out.println("Calling POST /notification to insert records into database");
                    MyMessage myMessage = new MyMessage(LocalDateTime.now().toString(), "", message.getBody());
                    RestTemplate restTemplate = new RestTemplate();
                    restTemplate.postForEntity(CREATE_MESSAGE_ENDPOINT_URL, myMessage, String.class);
                    System.out.println("Deleting a message.\n");
                    String messageReceiptHandle = messages.get(0).getReceiptHandle();
                    sqs.deleteMessage(new DeleteMessageRequest(sqsURL, messageReceiptHandle));


                }
            }
        }
    }
}

