package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.dto.AppointmentDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.Appointment;
import com.emailmkt.emailmarketing.repository.AccountRepository;
import com.emailmkt.emailmarketing.repository.AppointmentRepository;
import com.emailmkt.emailmarketing.service.AppointmentService;
import com.emailmkt.emailmarketing.service.MailService;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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

            return ResponseEntity.status(CONFLICT).body("Appointments Existed");
        }

        Appointment temp = appointmentRepository.findByName(mailAndAppointment.appointmentDTO.getName());


                    


        return ResponseEntity.status(CREATED).body(temp.getId() );

    }
    @RequestMapping(value="/accept-appointment", method= {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public String confirmAppointment(String confirmationToken)
    {
        return appointmentService.acceptAppointment(confirmationToken).getBody();
    }






    }

