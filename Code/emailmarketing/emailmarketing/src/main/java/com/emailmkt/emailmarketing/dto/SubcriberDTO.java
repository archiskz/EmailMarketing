package com.emailmkt.emailmarketing.dto;

import lombok.Data;

import java.util.List;

@Data
public class SubcriberDTO {

    private String name;

    private String email;

    private String type;


    private String tag;

    private List<GCSubcriberDTO> gcSubcriberDTOS;
}
