package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.model.Template;
import com.emailmkt.emailmarketing.repository.TemplateRepository;
import com.emailmkt.emailmarketing.service.TemplateService;
import com.sun.org.apache.xpath.internal.operations.String;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
//@RequestMapping(TemplateController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://45.77.172.104:3000"})
public class TemplateController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TemplateController.class);
//    private final AuthenticationManager authenticationManager;
    private final  TemplateService templateService;
    private final TemplateRepository templateRepository;

    @Autowired
    public TemplateController(TemplateService templateService, TemplateRepository templateRepository) {
        this.templateService = templateService;
        this.templateRepository = templateRepository;
    }

    @GetMapping("/template")
    public List<Template> getAllTemplates() {
        return templateService.getAllTemplates();
    }

//    @PostMapping("/template/search/{searchValue}")
//    public List<Template> searchByNameOrType(@PathVariable(value = "searchValue") String searchValue) {
//        return templateService.searchByNameorType(searchValue);
//    }

    @GetMapping("getAllTemplatesByType")
    public List<Template> getAllTemplatesByType(@RequestParam(value = "type") String type) {
        return templateService.getAllTemplatesbyType(type);
    }

    @GetMapping(value="/{id}")
    Template read(@PathVariable int id) {
        return templateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

    @PostMapping("template/create")
    public ResponseEntity createTemplate(@RequestBody Template template) {
        boolean flag = templateService.createTemplate(template);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Template này đã tồn tại ");
        }
        return ResponseEntity.status(CREATED).body("Okay");

    }

//    @PutMapping("/{id}")
//    @ResponseBody
//    Template update(@RequestBody Template updatingTemplate, @PathVariable int id) {
//        return templateRepository.findById(id)
//                .map(template -> {
//                    template.setNameTemplate(updatingTemplate.getNameTemplate());
//                    template.setContent(updatingTemplate.getContent());
//                    template.setUpdated_time(LocalDateTime.now().toString());
//                    ResponseEntity.status(ACCEPTED).body("Updated Successfully");
//                    return templateRepository.save(template);
//                })
//                .orElseGet(() -> {
//                    updatingTemplate.setId(id);
//
//                    return templateRepository.save(updatingTemplate);
//                });
//
//    }


    @PutMapping("/update")
    @ResponseBody
    public ResponseEntity<Template> update(@RequestBody Template updatingTemplate) {
        Template result = templateService.editTemplate(updatingTemplate);
        LOGGER.info("Updated Templates " + result.getNameTemplate());
        return new ResponseEntity<Template>(result, HttpStatus.ACCEPTED);

    }

    @PostMapping("template/copy/{id}")
    public ResponseEntity copyTemplate(@PathVariable int id) {
        boolean flag = templateService.copyTemplateGallery(id);
        if (flag == true) {
            return ResponseEntity.status(CONFLICT).body("Đã copy thành công ");
        }
        return ResponseEntity.status(CREATED).body("Fail");

    }
}
