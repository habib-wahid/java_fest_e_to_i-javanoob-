package com.example.etoiapp.controller;

import com.example.etoiapp.entity.InvestmentDetails;
import com.example.etoiapp.entity.Post;
import com.example.etoiapp.entity.User;
import com.example.etoiapp.projections.PostDTO;
import com.example.etoiapp.repo.PostRepo;
import com.example.etoiapp.repo.UserRepo;
import com.example.etoiapp.service.FileUploadUtil;
import com.example.etoiapp.service.PostService;
import com.fasterxml.jackson.core.JsonProcessingException;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/create-post")
    @Transactional
    public ResponseEntity<String> createPost(@RequestParam("logo")MultipartFile multipartFile,@RequestParam("file") String file) throws IOException {

        System.out.println("FileName " + multipartFile.getOriginalFilename());
        ObjectMapper objectMapper = new ObjectMapper();
        PostDescription postDescription = objectMapper.readValue(file,PostDescription.class);

        User user = userRepo.findByUserName(postDescription.getUserName());

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        String uploadDir = "posts/" + postDescription.getUserName();
        FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);


        Post post = new Post();
        post.setDate(new Date());
        post.setName(postDescription.getUserName());
        post.setProjectName(postDescription.getProjectName());
        post.setDescription(postDescription.getProjectDescription());
        post.setType(postDescription.getProjectType());
        post.setBannerPath(multipartFile.getOriginalFilename());
        post.setRootPath(uploadDir);
        post.setInvestmentFound(Long.parseLong(postDescription.getInvestment()));
        post.setInvestmentNeeded(Long.parseLong(postDescription.getInvestmentNeeded()));

        user.setUserPosts(Arrays.asList(post));

        System.out.println("Username " + postDescription.getUserName());
        return new ResponseEntity<>("post created", HttpStatus.OK);
    }

    @GetMapping("/user-posts")
    public ResponseEntity<List<PostDTO>> userPosts(@RequestParam String username){
        return new ResponseEntity<>(postService.findUserPost(username), HttpStatus.OK);
    }


    @GetMapping("all-posts")
    public ResponseEntity<List<PostDTO>> getAllPost(){
        return new ResponseEntity<List<PostDTO>>(postService.findAllPost(),HttpStatus.OK);
    }

    @PutMapping("/edit-post")
    public ResponseEntity<Post> editPost(@RequestBody EditPostBody body){

        System.out.println("ID " + body.getId());

        Optional<Post> postBody = postRepo.findById(body.getId());
        Post post = postBody.get();
        post.setProjectName(body.getProjectName());
        post.setType(body.getProjectType());
        post.setDescription(body.getProjectDescription());
        post.setInvestmentNeeded(Long.valueOf(body.getInvestmentNeeded()));
        post.setInvestmentFound(Long.valueOf(body.getInvestment()));

        return new ResponseEntity<>(postRepo.save(post),HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/make-investment")
    public ResponseEntity<String> postInvestment(@RequestBody InvestmentBody body){
        System.out.println("Body " + body.getId());

        Optional<Post> post = postRepo.findById(body.getId());
        Post post1 = post.get();
        InvestmentDetails investmentDetails = new InvestmentDetails();
        investmentDetails.setUsername(body.getName());
        investmentDetails.setAmount(Long.valueOf(body.getInvestment()));
        post1.setInvestmentDetailsList(Arrays.asList(investmentDetails));

        return new ResponseEntity<>("Data saved",HttpStatus.OK);
    }

    @GetMapping("/get-investment-details")
    public ResponseEntity<List<InvestmentDetails>> getInvestmentDetails(@RequestParam("id") Long id){

        Optional<Post> post = postRepo.findById(id);
        Post a = post.get();
        return new ResponseEntity<>(a.getInvestmentDetailsList(),HttpStatus.OK);
    }

    @DeleteMapping("/delete-post/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id){

        System.out.println("ID " + id);
        postRepo.deleteById(id);
        return new ResponseEntity<>("Post deleted",HttpStatus.OK);
    }
}


@Data
class InvestmentBody{
    private Long id;
    private String name;
    private String investment;
}

@Data
class PostDescription{

    private String userName;
    private String projectName;
    private String projectType;
    private String projectDescription;
    private String investment;
    private String investmentNeeded;

}

@Data
class EditPostBody{

    private Long id;
    private String projectName;
    private String projectType;
    private String projectDescription;
    private String investment;
    private String investmentNeeded;

}