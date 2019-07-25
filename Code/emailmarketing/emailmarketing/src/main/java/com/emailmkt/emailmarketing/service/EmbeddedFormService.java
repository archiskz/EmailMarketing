package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.dto.EmbeddedFormDTO;
import com.emailmkt.emailmarketing.model.EmbeddedForm;

public interface EmbeddedFormService {
    boolean createForm(EmbeddedFormDTO embeddedFormDTO);

     boolean editForm(EmbeddedFormDTO embeddedFormDTO,int id);


    EmbeddedForm getFormById(int id);



}
