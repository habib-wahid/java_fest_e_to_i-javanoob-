package com.example.etoiapp.service;
import com.example.etoiapp.entity.Role;
import com.example.etoiapp.entity.User;
import com.example.etoiapp.repo.RoleRepo;
import com.example.etoiapp.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserServiceImp implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;


    @Override
    public User saveUser(User user,Role role) {

        log.info("Saving new user {} to the database",user.getName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.getRoles().add(role);
        return userRepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {

        log.info("Saving new role {} to the database",role.getRoleName());

        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String userName, String roleName) {

        log.info("Adding role {} to user {}",roleName,userName);

        User user = userRepo.findByUserName(userName);
        Role role = roleRepo.findByRoleName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public User getUser(String userName) {

        log.info("Fetching user {} to the database",userName);
        return userRepo.findByUserName(userName);
    }

    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUserName(username);

        if(user == null){
            log.error("User not found in database");
            throw new UsernameNotFoundException("User not found in database");
        }
        else{
            log.info("User found in database: {}",username);
        }

        Collection<SimpleGrantedAuthority>authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
        });

        return new org.springframework.security.core.userdetails.User(user.getUserName(),user.getPassword(),authorities);
    }
}

