package com.example.etoiapp.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

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
    private Date date;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    List<InvestmentDetails> investmentDetailsList;

}
