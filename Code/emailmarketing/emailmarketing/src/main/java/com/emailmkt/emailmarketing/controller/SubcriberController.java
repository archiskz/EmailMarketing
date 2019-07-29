package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.dto.SubcriberDTO;
import com.emailmkt.emailmarketing.dto.SubcriberFormDTO;
import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.repository.SubcriberRepository;
import com.emailmkt.emailmarketing.service.SubcriberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")

@CrossOrigin(origins = "*", allowedHeaders = "*")

public class SubcriberController {
    private final SubcriberRepository subcriberRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(SubcriberController.class);
    @Autowired
    SubcriberService subcriberService;

    @Autowired
    public SubcriberController(SubcriberRepository subcriberRepository) {
        this.subcriberRepository = subcriberRepository;
    }


    @GetMapping("/subcribers")
    Iterable<Subcriber> getAll() {
        return subcriberRepository.findAll();
    }



    @GetMapping("/subcribersV2")
    public ResponseEntity<List<SubcriberDTO>> getAllSubcriber() {
        List<SubcriberDTO> vms = subcriberService.getAllSubcriberV2();
        return new ResponseEntity<List<SubcriberDTO>>(vms, HttpStatus.OK);
    }

    @GetMapping(value="subcriber/{id}")
    Subcriber read(@PathVariable int id) {
        return subcriberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

    @PostMapping("subcriber/create")
    public ResponseEntity createSubcriber(@RequestBody SubcriberDTO dto) {
        boolean flag = subcriberService.createSubcrbier(dto);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Email Existed");
        }
        return ResponseEntity.status(CREATED).body("Successfully");

    }


    @PostMapping("subcriber/createForm")
    public ResponseEntity createSubcriberForm(@RequestBody SubcriberFormDTO dto) {
        boolean flag = subcriberService.createSubcriberForm(dto);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Email Existed");
        }
        return ResponseEntity.status(CREATED).body("Successfully");

    }

    @PostMapping("subcriber/createListSubcriber")
    public ResponseEntity createListSubcriber(@RequestBody List<SubcriberDTO> dtos) {
        boolean flag = subcriberService.createListSubcrbier(dtos);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Email đã tồn tại vui lòng thêm email khác");
        }
        return ResponseEntity.status(CREATED).body("Successfully");

    }

    @GetMapping("subcriber/getSubcriberByTag")
    public List<Subcriber> getSubcriberByTag(@RequestParam(value = "tag") String tag) {
        return subcriberService.getSubcriberByTag(tag);
    }
    @PutMapping("subcriber/edit/{id}")
    Subcriber update(@RequestBody Subcriber updatingSubcriber, @PathVariable int id) {
        return subcriberRepository.findById(id)
                .map(subcriber -> {
                    subcriber.setEmail(updatingSubcriber.getEmail());
                    subcriber.setFirstName(updatingSubcriber.getFirstName());
                    subcriber.setLastName(updatingSubcriber.getLastName());
                    subcriber.setDob(updatingSubcriber.getDob());
                    subcriber.setPhone(updatingSubcriber.getPhone());
                    subcriber.setAddress(updatingSubcriber.getAddress());
                    subcriber.setUpdatedTime(LocalDateTime.now().toString());
                   return subcriberRepository.save(subcriber);
                })
                .orElseGet(() -> {
                    updatingSubcriber.setId(id);

                    return subcriberRepository.save(updatingSubcriber);
                });

    }

//
    @GetMapping("/subcriber/getAllSubcriberByAccountId")
    public List<Subcriber> getAllSubcriberByAccountId(@RequestParam(value = "account_id") int accountId) {
        return subcriberService.getSubcriberByAccountId(accountId);
    }

    @PostMapping("/subcriber/search/{searchValue}")
    public List<Subcriber> searchSubcriber(@PathVariable(value = "searchValue") String searchValue){
        return subcriberService.searchByNameorEmail(searchValue);
    }

    @DeleteMapping("/delete-subcriber")
    public ResponseEntity<String> deleteSubcriber(@RequestParam int id,@RequestParam int groupId) {
        String message = subcriberService.deleteSubcriber(id,groupId);
        LOGGER.info("delete contact: " + id);
        return new ResponseEntity<String>(message, HttpStatus.OK);
    }



    }
