package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.dto.AppointmentDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.Appointment;
import com.emailmkt.emailmarketing.repository.AccountRepository;
import com.emailmkt.emailmarketing.repository.AppointmentRepository;
import com.emailmkt.emailmarketing.service.AppointmentService;
import com.emailmkt.emailmarketing.service.MailService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static javax.mail.event.FolderEvent.CREATED;
import static org.springframework.http.HttpStatus.CONFLICT;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin(origins = {"*"})
public class AppointmentController {
    private final AppointmentRepository appointmentRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(AppointmentController.class);

    private final Configuration templates;

    @Autowired
    AppointmentService appointmentService;
    @Autowired
    MailService mailService;
    @Autowired
    AccountRepository accountRepository;




    @Autowired
    public AppointmentController(AppointmentRepository appointmentRepository, Configuration templates) {
        this.appointmentRepository = appointmentRepository;
        this.templates = templates;
    }

    static class MailAndAppointment {
        public MailObjectDTO mailObjectDTO;
        public AppointmentDTO appointmentDTO;
    }










    @ApiOperation(value = "Create Appointment")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid  ID"),
            @ApiResponse(code = 500, message = "Internal server error") })
    @PostMapping(value="appointment/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createAppointment(@RequestBody MailAndAppointment mailAndAppointment) throws IOException, TemplateException {
           boolean flag = appointmentService.createAppointment(mailAndAppointment.mailObjectDTO,mailAndAppointment.appointmentDTO);
                if (flag == false) {
                    return ResponseEntity.status(CONFLICT).body("Campaign Existed");
                }
                Appointment appointment = appointmentRepository.findByName(mailAndAppointment.appointmentDTO.getName());
        String to ="dragontna4997@gmail.com";
        String bodyTemp=appointment.getBody();
        int index = bodyTemp.indexOf("<a href=\"\"") +8;
        System.out.println(index);

        String newString = new String();

        for (int i = 0; i < bodyTemp.length(); i++) {

            // Insert the original string character
            // into the new string
            newString += bodyTemp.charAt(i);

            if (i == index) {

                // Insert the string to be inserted
                // into the new string
                newString += "http://103.79.141.134:8080/api/accept-appointment?confirmationToken="+mailAndAppointment.appointmentDTO.getToken();
            }
        }
//        map.put("VERIFICATION_URL","http://localhost:8080/api/accept-appointment?confirmationToken="+ mailAndAppointment.appointmentDTO.getToken());
//        String bodyTemp = FreeMarkerTemplateUtils.processTemplateIntoString(t, map);
//        System.out.println("Bodytemp"+bodyTemp);
        Appointment temp = appointmentRepository.findByName(mailAndAppointment.appointmentDTO.getName());
        mailService.sendAppointment(mailAndAppointment.mailObjectDTO.getFrom(),
                                        mailAndAppointment.mailObjectDTO.getFromMail(),
                                        to,mailAndAppointment.mailObjectDTO.getSubject(),
                newString);
        return ResponseEntity.status(CREATED).body(temp.getId() );

    }
    @RequestMapping(value="/accept-appointment", method= {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public String confirmAppointment(String confirmationToken)
    {
        return appointmentService.acceptAppointment(confirmationToken).getBody();
    }






    }

