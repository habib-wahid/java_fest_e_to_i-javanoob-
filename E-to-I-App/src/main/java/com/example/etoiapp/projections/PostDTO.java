package com.example.etoiapp.projections;
import java.time.LocalDateTime;
import java.util.Date;

public interface PostDTO {

    Long getId();
    String getCompanyName();
    String getDescription();
    String getType();
    String getProjectName();
    Long getInvestmentfound();
    Long getInvestmentneeded();
    String getRootPath();
    String getBannerPath();
    Date getDate();
}
