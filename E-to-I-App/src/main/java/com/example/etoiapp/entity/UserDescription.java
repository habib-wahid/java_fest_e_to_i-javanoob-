package com.example.etoiapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String company;
    private String companyType;
    private String description;
    private String website;
    private String linkedIn;
    private String basePath;
    private String originalPath;
    private String technology;


}
