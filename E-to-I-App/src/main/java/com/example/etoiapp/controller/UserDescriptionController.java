package com.example.etoiapp.controller;

import com.example.etoiapp.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@RestController
@RequestMapping("/user")
public class UserDescriptionController {

    @Autowired
    private UserService userService;


    @PostMapping("/upload")
    public void uploadDescription(@RequestParam("logo") MultipartFile multipartFile,@RequestParam("file") String file) throws JsonProcessingException {
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        ObjectMapper objectMapper = new ObjectMapper();
        Description description = objectMapper.readValue(file,Description.class);

        System.out.println(description.getCompany() + " " + description.getDescription());
        System.out.println("fileName " + fileName);
    }
}


@Data
class Description {
    private String company;
    private String companyType;
    private String description;
    private String investment;
    private String investmentNeeded;

}