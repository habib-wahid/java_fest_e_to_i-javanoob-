package com.example.etoiapp.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String Name;
    private String projectName;
    private String Type;
    @Lob
    private String Description;
    private Long investmentFound;
    private Long investmentNeeded;
    private String bannerPath;
    private String rootPath;

}
