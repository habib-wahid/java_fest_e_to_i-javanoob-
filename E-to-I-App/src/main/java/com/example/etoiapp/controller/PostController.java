package com.example.etoiapp.controller;

import com.example.etoiapp.entity.Post;
import com.example.etoiapp.projections.PostDTO;
import com.example.etoiapp.repo.PostRepo;
import com.example.etoiapp.service.PostService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepo postRepo;

    @PostMapping("/create-post")
    public ResponseEntity<String> createPost(@RequestParam("logo")MultipartFile multipartFile,@RequestParam("file") String file) throws JsonProcessingException {

        System.out.println("FileName " + multipartFile.getOriginalFilename());
        ObjectMapper objectMapper = new ObjectMapper();
        PostDescription postDescription = objectMapper.readValue(file,PostDescription.class);

        Post post = new Post();
        post.setName(postDescription.getUserName());
        post.setProjectName(postDescription.getProjectName());
        post.setDescription(postDescription.getProjectDescription());
        post.setType(postDescription.getProjectType());
        post.setBannerPath(multipartFile.getOriginalFilename());
        post.setInvestmentFound(Long.parseLong(postDescription.getInvestment()));
        post.setInvestmentNeeded(Long.parseLong(postDescription.getInvestmentNeeded()));

        postRepo.save(post);

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