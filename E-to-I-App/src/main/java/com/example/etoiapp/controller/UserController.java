package com.example.etoiapp.controller;
import com.example.etoiapp.entity.Role;
import com.example.etoiapp.entity.User;
import com.example.etoiapp.projections.UserDescriptionDTO;
import com.example.etoiapp.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){

        return ResponseEntity.ok().body(userService.getUsers());
    }


    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam("username") String username){
        return ResponseEntity.ok().body(userService.getUser(username));
    }


    @GetMapping("/getUser1")
    public void getUser1(@RequestParam("username") String username){
        System.out.println("userName " + username);

    }

    @PostMapping("/user/save")
    public ResponseEntity<User> saveUser(@RequestBody RegisterUser user){

        Role role = new Role(null,user.getRole());
        userService.saveRole(role);
        System.out.println("RoleName "+ user.getRole());

        return ResponseEntity.ok().body(userService.saveUser(user.getUser(),role));
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role){

        return ResponseEntity.ok().body(userService.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<Role> addRoleToUser(@RequestBody RoleToUserForm form){

        userService.addRoleToUser(form.getUserName(),form.getRoleName());
        return ResponseEntity.ok().build();
    }

}

@Data
class RoleToUserForm{
    private String userName;
    private String roleName;
}

@Data
class RegisterUser{
    private User user;
    private String role;
}

@Data
class UserName{
    private String username;
}
