package com.emailmkt.emailmarketing.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class EmbeddedFormDTO implements Serializable {
    private String name;
    private String form;
    private String createdTime;
    private String code;



    private List<GCFormDTO> gcFormDTOS;



}
