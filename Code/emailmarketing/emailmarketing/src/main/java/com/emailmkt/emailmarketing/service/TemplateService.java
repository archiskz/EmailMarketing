package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.model.Template;

import java.util.List;


public interface TemplateService {
    boolean createTemplate(Template template);


    List<Template> getAllTemplates();

    List<Template> getAllTemplatesbyType(String type);

    Template updateTemplate(Template template);

    Template editTemplate(Template template);

//    Template getTemplateById(int id);

    boolean editTemplate(int id);

    boolean copyTemplateGallery( int id);



//    List<Template> searchByNameorType( String searchValue);
}
