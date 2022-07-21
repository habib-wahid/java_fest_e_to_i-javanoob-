package com.example.etoiapp;
import com.example.etoiapp.entity.Role;
import com.example.etoiapp.entity.User;
import com.example.etoiapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class EToIAppApplication implements CommandLineRunner{

    @Autowired
    private UserService userService;

    public static void main(String[] args) {

        SpringApplication.run(EToIAppApplication.class, args);

    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }



    @Override
    public void run(String... args) throws Exception {

        userService.saveRole(new Role(null,"ROLE_USER"));
        userService.saveRole(new Role(null,"ROLE_MANAGER"));

        userService.saveUser(new User(null,"habib","habib_wahid","123",new ArrayList<>()));
        userService.saveUser(new User(null,"jia","jia","1234",new ArrayList<>()));

        userService.addRoleToUser("habib_wahid","ROLE_MANAGER");
        userService.addRoleToUser("jia","ROLE_USER");

    }
}
