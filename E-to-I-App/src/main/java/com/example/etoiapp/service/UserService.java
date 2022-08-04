package com.example.etoiapp.service;
import com.example.etoiapp.entity.Role;
import com.example.etoiapp.entity.User;
import com.example.etoiapp.entity.UserDescription;

import java.util.List;

public interface UserService {

    User saveUser(User user,Role role);
    Role saveRole(Role role);
    void addRoleToUser(String userName,String roleName);
    User getUser(String userName);
    List<User> getUsers();

}
