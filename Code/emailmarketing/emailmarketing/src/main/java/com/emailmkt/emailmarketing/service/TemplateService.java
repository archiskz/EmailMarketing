package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.model.Template;
import com.sun.org.apache.xpath.internal.operations.String;

import java.util.List;


public interface TemplateService {
    Boolean createTemplate(Template template);

    List<Template> getAllTemplates();

    List<Template> getAllTemplatesbyType(String type);

    Template updateTemplate(Template template);

    Template editTemplate(Template template);

//    List<Template> searchByNameorType( String searchValue);
}
