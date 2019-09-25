package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.Utils.Ultilities;
import com.emailmkt.emailmarketing.dto.AppointmentDTO;
import com.emailmkt.emailmarketing.dto.AppointmentFullDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.dto.SegmentDTO;
import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.Appointment;
import com.emailmkt.emailmarketing.repository.AccountRepository;
import com.emailmkt.emailmarketing.repository.AppointmentRepository;
import com.emailmkt.emailmarketing.repository.CampaignSubcriberRepository;
import com.emailmkt.emailmarketing.service.AppointmentService;
import com.emailmkt.emailmarketing.service.MailService;
import com.emailmkt.emailmarketing.service.SQSService;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

import static javax.mail.event.FolderEvent.CREATED;
import static org.springframework.http.HttpStatus.CONFLICT;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AppointmentController {
    private final AppointmentRepository appointmentRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(AppointmentController.class);

    private final Configuration templates;

    @Autowired
    AppointmentService appointmentService;
    @Autowired
    MailService mailService;

    @Autowired
    CampaignSubcriberRepository campaignSubcriberRepository;
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    SQSService sqsService;


    @Autowired
    public AppointmentController(AppointmentRepository appointmentRepository, Configuration templates) {
        this.appointmentRepository = appointmentRepository;
        this.templates = templates;
    }

    static class MailAndAppointment {
        public MailObjectDTO mailObjectDTO;
        public AppointmentDTO appointmentDTO;
        public List<SegmentDTO> segmentDTOs;
        public String condition;
    }


    @ApiOperation(value = "Create Appointment")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid  ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @PostMapping(value = "appointment/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createAppointment(@RequestBody MailAndAppointment mailAndAppointment, HttpServletRequest request) throws IOException, TemplateException {
        String username = Ultilities.getUsername(request);
        Account account = accountRepository.findAccountByUsername(username);
        boolean flag = appointmentService.createAppointment(mailAndAppointment.mailObjectDTO, mailAndAppointment.appointmentDTO, account,mailAndAppointment.segmentDTOs,mailAndAppointment.condition);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Appointment Existed");
        }
        Appointment temp = appointmentRepository.findByName(mailAndAppointment.appointmentDTO.getName());
        return ResponseEntity.status(CREATED).body(temp.getId());

    }


    @PostMapping(value = "message/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public void createNotification() {
         sqsService.getMessage();
    }

    @RequestMapping(value = "/accept-appointment", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String confirmAppointment(String confirmationToken, String subcriberEmail) {
        return appointmentService.acceptAppointment(confirmationToken,subcriberEmail).getBody();
    }

    @RequestMapping(value = "/deny-appointment", method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String denyAppointment(String confirmationToken, String subcriberEmail) {
        return appointmentService.denyAppointment(confirmationToken,subcriberEmail).getBody();
    }

    @GetMapping("/appointments")
    Iterable<Appointment> getAll(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        System.out.println("USER NAME IS :" + username);
        Account account = accountRepository.findAccountByUsername(username);
        System.out.println("ACCOUNTID IS :" + account.getId());
        return appointmentRepository.findAppointmentByAccount_idOrderByCreatedTimeDesc(account.getId());
//        List<Appointment> appointmentList =appointmentRepository.findAppointmentByAccount_idOrderByCreatedTimeDesc(account.getId()).stream().map(g->{
//            Appointment appointment = new Appointment();
//            appointment.setId(g.getId());
//            if(g.getName().contains(">")){
//                String []output = g.getName().split(">");
//                appointment.setName(output[0]);
//
//            }else{appointment.setName(g.getName());}
//            appointment.setTime(g.getTime());
//            appointment.setRequest(g.getRequest());
//            appointment.setClickRate(g.getClickRate());
//            return appointment;
//        }).collect(Collectors.toList());
//        return appointmentList;

    }

    @GetMapping("/appointment/segment")
    Iterable<AppointmentDTO> getAppointmentSegment(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        System.out.println("USER NAME IS :" + username);
        Account account = accountRepository.findAccountByUsername(username);
        return appointmentService.getAppointmentSegment(account.getId());
    }
    @GetMapping("appointment/{id}")
    public AppointmentFullDTO getAppointmentById(@PathVariable(value = "id") int id) {
        return appointmentService.getAppointmentById(id);
    }


    ///Test POST
    @PostMapping("appointment/copy/")
    public ResponseEntity copyAppointment(@RequestParam int id,@RequestParam int workflowId, HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        System.out.println("USER NAME IS :" + username);
        Account account = accountRepository.findAccountByUsername(username);
        int number = appointmentService.copyAppointment(id,workflowId,account);
        if (number != 1) {
            return ResponseEntity.status(CONFLICT).body("Đã copy thành công ");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Fail");

    }

    @GetMapping("/appointment/statistic")
    public ResponseEntity getStatistic() {
        appointmentService.getStatisticAppointment();
        return ResponseEntity.status(HttpStatus.OK).body("Successfully");
    }






}

