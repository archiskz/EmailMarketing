package com.emailmkt.emailmarketing.dto;

import com.emailmkt.emailmarketing.model.Subcriber;
import lombok.Data;

import java.util.List;

@Data
public class SubcriberDTO {
    private int id;


    private String name;

    private String email;

    private String type;

    private String tag;

    private List<GCSubcriberDTO> gcSubcriberDTOS;
}
