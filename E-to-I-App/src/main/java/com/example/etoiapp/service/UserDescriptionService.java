package com.example.etoiapp.service;

import com.example.etoiapp.entity.UserDescription;
import com.example.etoiapp.repo.UserDescriptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserDescriptionService {

    @Autowired
    private UserDescriptionRepo userDescriptionRepo;

    public void saveDescription(UserDescription userDescription) {

        userDescriptionRepo.save(userDescription);
    }
}
