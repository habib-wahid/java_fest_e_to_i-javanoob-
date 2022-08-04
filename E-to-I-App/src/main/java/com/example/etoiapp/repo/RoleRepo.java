package com.example.etoiapp.repo;
import com.example.etoiapp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepo extends JpaRepository<Role,Long> {

    Role findByRoleName(String roleName);

}
