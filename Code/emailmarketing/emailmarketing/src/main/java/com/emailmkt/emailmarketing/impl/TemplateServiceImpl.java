package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.model.Template;
import com.emailmkt.emailmarketing.repository.TemplateRepository;
import com.emailmkt.emailmarketing.service.TemplateService;
import com.sun.org.apache.xpath.internal.operations.String;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TemplateServiceImpl implements TemplateService {

    @Autowired
    TemplateRepository templateRepository;


    @Override
    public boolean createTemplate(Template template) {
            System.out.println(template.getNameTemplate());
            Template checkExistedTemplate = templateRepository.findByNameTemplate(template.getNameTemplate());
            if (checkExistedTemplate != null) {
                return false;
            }
            template.setNameTemplate(template.getNameTemplate());
            template.setType(template.getType());
            template.setCreated_time(LocalDateTime.now().toString());
            templateRepository.save(template);
            return true;
    }

    @Override
    public boolean copyTemplateGallery(int templateId) {
        Template templateGallery = templateRepository.findTemplateById(templateId);
        Template template = new Template();
        if(templateGallery != null) {
            template.setAccount_id(2);
            template.setContent(templateGallery.getContent());
            template.setCreated_time(LocalDateTime.now().toString());
            template.setNameTemplate(templateGallery.getNameTemplate() + "Copy");
            template.setType(templateGallery.getType());
            templateRepository.save(template);
            return true;
        }
        return false;
    }

    @Override
    public List<Template> getAllTemplates() {
        System.out.println("hehe");
        return templateRepository.findAll();
    }

    @Override
    public List<Template> getAllTemplatesbyType(String type) {
        return (List<Template>) templateRepository.findByType(type);
    }

    @Override
    public Template updateTemplate(Template template) {
        return null;
    }

    @Override
    public Template editTemplate(Template template) {
        return null;
    }

//    @Override
//    public Template getTemplateById(int id) {
//        return templateRepository.findById(id);
//    }

    @Override
    public boolean editTemplate(int id) {
        return false;
    }


//    @Override
//    public List<Template> searchByNameorType(String searchValue) {
//        return templateRepository.searchByNameorType(searchValue);
//    }

}
