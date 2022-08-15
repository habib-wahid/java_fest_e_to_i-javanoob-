package com.example.etoiapp.controller;
import com.example.etoiapp.entity.Investor;
import com.example.etoiapp.entity.User;
import com.example.etoiapp.entity.UserDescription;
import com.example.etoiapp.repo.InvestorRepo;
import com.example.etoiapp.repo.UserRepo;
import com.example.etoiapp.service.FileUploadUtil;
import com.example.etoiapp.service.UserDescriptionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Transactional
@RestController
@RequestMapping("/user")
public class UserDescriptionController {

    @Autowired
    private UserDescriptionService userDescriptionService;


    @Autowired
    private UserRepo userRepo;

    @Autowired
    private InvestorRepo investorRepo;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDescription(@RequestParam("logo") MultipartFile multipartFile, @RequestParam("file") String file) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        Description description = objectMapper.readValue(file,Description.class);


        System.out.println(description.getTechnology());


        UserDescription userDescription = new UserDescription();
        userDescription.setDescription(description.getDescription());
        userDescription.setCompany(description.getCompany());
        userDescription.setCompanyType(description.getCompanyType());
        userDescription.setTechnology(description.getTechnology());
        userDescription.setLinkedIn(description.getLinkedIn());
        userDescription.setWebsite(description.getWebsite());
        userDescription.setBasePath("user-photos/" + description.getCompany());


        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());


        userDescription.setOriginalPath(fileName);

        userDescriptionService.saveDescription(userDescription);

        String uploadDir = "user-photos/" + description.getCompany();

        User user = userRepo.findByUserName(description.getCompany());
        System.out.println("User " + user.getUserName());
        user.setUserDescription(userDescription);



        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);


        System.out.println(description.getCompany() + " " + description.getDescription());
        System.out.println("fileName " + fileName);

        return new ResponseEntity<>("Data Saved", HttpStatus.OK);
    }

    @PostMapping("/save-investor")
    public ResponseEntity<String> saveInvestor(@RequestBody InvestorBody body){

        User user = userRepo.findByUserName(body.getUsername());

        Investor investor = new Investor();
        investor.setName(body.getUsername());
        investor.setNumber(body.getNumber());
        investor.setProjectType(body.getProjectType());
        investor.setAddress(body.getAddress());
        investor.setInvestment(body.getInvestment());
        user.setInvestor(investor);

        System.out.println("User" + user);
        return new ResponseEntity<>("Save investor ",HttpStatus.OK);
    }

    @GetMapping("/get-investor")
    public ResponseEntity<User> getInvestor(@RequestParam("username") String username){
        User user = userRepo.findByUserName(username);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping("all-investor")
    public ResponseEntity<List<Investor>> getAllInvestor(){

        List<Investor> investors = investorRepo.findAll();
        return new ResponseEntity<>(investors,HttpStatus.OK);

    }
}

@Data
class InvestorBody {

    private String username;
    private String number;
    private String projectType;
    private String investment;
    private String address;
}


@Data
class Description {
    private String company;
    private String companyType;
    private String technology;
    private String description;
    private String website;
    private String linkedIn;

}

@Data
class Tech{

    private String ml;
    private String security;
    private String web;
    private String blockChain;
    private String android;


}