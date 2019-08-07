package com.emailmkt.emailmarketing.impl;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.DeleteMessageRequest;
import com.amazonaws.services.sqs.model.Message;
import com.amazonaws.services.sqs.model.ReceiveMessageRequest;
import com.emailmkt.emailmarketing.model.AppointmentSubcriber;
import com.emailmkt.emailmarketing.model.CampaignSubcriber;
import com.emailmkt.emailmarketing.model.MyMessage;
import com.emailmkt.emailmarketing.repository.AppointmentSubcriberRepository;
import com.emailmkt.emailmarketing.repository.CampaignSubcriberRepository;
import com.emailmkt.emailmarketing.service.SQSService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

<<<<<<< HEAD

=======
//    @Autowired
//    HibernateSearchService hibernateSearchService;
>>>>>>> 85360d2359fc3c73a0810a29174ac89f54e90407

    @Autowired
    CampaignSubcriberRepository campaignSubcriberRepository;

    @Autowired
    AppointmentSubcriberRepository appointmentSubcriberRepository;

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String awsRegion;

    @Value("${sqs.url}")
    private String sqsURL;

    @Override
    @Scheduled(fixedRate = 10000)
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
                ObjectMapper mapper = new ObjectMapper();
                //Convert Json
                try {
                    String jsonInString = message.getBody();
                    JSONObject jsonObject = new JSONObject(jsonInString);
                    JSONObject mail = jsonObject.getJSONObject("mail");
                    String messageId = (String) mail.get("messageId");
                    String eventType = (String) jsonObject.get("eventType");
                    List<AppointmentSubcriber> appointmentSubcribers = appointmentSubcriberRepository.findMessageId(messageId.trim());
                    List<CampaignSubcriber> campaignSubcribers = campaignSubcriberRepository.findMessageId(messageId.trim());
                    if (!appointmentSubcribers.isEmpty()) {
                        AppointmentSubcriber appointmentSubcriber = appointmentSubcribers.stream().findFirst().get();
                        if (eventType.contains("Open")) {
                            appointmentSubcriber.setOpened(true);
                        } else if (eventType.contains("Click")) {
                            appointmentSubcriber.setConfirmation(true);
                        }
                        if(eventType.contains("Delivery")){
                            appointmentSubcriber.setDelivery(true);
                        }
                        appointmentSubcriberRepository.save(appointmentSubcriber);
                    } else {
                        if(!campaignSubcribers.isEmpty()) {
                            CampaignSubcriber campaignSubcriber = campaignSubcribers.stream().findFirst().get();
                            if (eventType.contains("Open")) {
                                campaignSubcriber.setOpened(true);
                            } else if (eventType.contains("Click")) {
                                campaignSubcriber.setComfirmation(true);
                            }
                            if (eventType.contains("Delivery")) {
                                campaignSubcriber.setDelivery(true);
                            }
                            campaignSubcriberRepository.save(campaignSubcriber);
                        }

                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
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

