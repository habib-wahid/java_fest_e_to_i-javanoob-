package com.example.etoiapp.service;
import com.example.etoiapp.entity.Post;
import com.example.etoiapp.projections.PostDTO;
import com.example.etoiapp.repo.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Service
public class PostService {

    @Autowired
    private PostRepo postRepo;


    public List<PostDTO> findUserPost(String username) {
        return postRepo.findUserPost(username);
    }

    public List<PostDTO> findAllPost() {
        return postRepo.findAllPost();
    }
}
