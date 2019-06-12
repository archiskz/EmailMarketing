package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.model.Template;
import com.emailmkt.emailmarketing.service.TemplateService;
import com.sun.org.apache.xpath.internal.operations.String;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
//@RequestMapping(TemplateController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class TemplateController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TemplateController.class);
//    private final AuthenticationManager authenticationManager;


    @Autowired
    TemplateService templateService;

    @GetMapping("/template")
    public List<Template> getAllTemplates() {
        return templateService.getAllTemplates();
    }

    @PostMapping("/template/search/{searchValue}")
    public List<Template> searchByNameOrType(@PathVariable(value = "searchValue") String searchValue) {
        return templateService.searchByNameorType(searchValue);
    }

    @GetMapping("getAllTemplatesByType")
    public List<Template> getAllTemplatesByType(@RequestParam(value = "type") String type) {
        return templateService.getAllTemplatesbyType(type);
    }

    @PostMapping("template/create")
    public ResponseEntity createTemplate(@RequestBody Template template) {
        boolean flag = templateService.createTemplate(template);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Template này đã tồn tại ");
        }
        return ResponseEntity.status(CREATED).body("Thêm thành công");

    }
}
