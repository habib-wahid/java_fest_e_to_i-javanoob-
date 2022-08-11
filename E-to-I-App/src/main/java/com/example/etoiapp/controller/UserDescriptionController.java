package com.example.etoiapp.controller;
import com.example.etoiapp.entity.User;
import com.example.etoiapp.entity.UserDescription;
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

@Transactional
@RestController
@RequestMapping("/user")
public class UserDescriptionController {

    @Autowired
    private UserDescriptionService userDescriptionService;


    @Autowired
    private UserRepo userRepo;


    @PostMapping("/upload")
    public ResponseEntity<String> uploadDescription(@RequestParam("logo") MultipartFile multipartFile, @RequestParam("file") String file) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        Description description = objectMapper.readValue(file,Description.class);

        UserDescription userDescription = new UserDescription();
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        userDescription.setLogo(fileName);
        userDescription.setDescription(description.getDescription());
        userDescription.setInvestment(description.getInvestment());
        userDescription.setType(description.getCompanyType());
        userDescription.setName(description.getCompany());
        userDescription.setRequiredInvestment(description.getInvestmentNeeded());
        userDescription.setBasePath("user-photos/" + description.getCompany());
        userDescriptionService.saveDescription(userDescription);

        String uploadDir = "user-photos/" + userDescription.getName();

        User user = userRepo.findByUserName(description.getCompany());
        System.out.println("User " + user.getUserName());
        user.setUserDescription(userDescription);



        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);


        System.out.println(description.getCompany() + " " + description.getDescription());
        System.out.println("fileName " + fileName);

        return new ResponseEntity<>("Data Saved", HttpStatus.OK);
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