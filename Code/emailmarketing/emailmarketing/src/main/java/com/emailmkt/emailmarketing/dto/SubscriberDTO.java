package com.emailmkt.emailmarketing.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Subscriber implements Serializable {
    private int id;
    private String name;
    private String email;
    private String Status;
}