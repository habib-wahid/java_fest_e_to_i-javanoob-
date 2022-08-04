package com.example.etoiapp.repo;

import com.example.etoiapp.entity.UserDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDescriptionRepo extends JpaRepository<UserDescription,Long> {

}
