package com.example.etoiapp.repo;
import com.example.etoiapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long> {

    User findByUserName(String userName);
}
