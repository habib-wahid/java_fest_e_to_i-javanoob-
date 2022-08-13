package com.example.etoiapp.repo;
import com.example.etoiapp.entity.User;
import com.example.etoiapp.projections.UserDescriptionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepo extends JpaRepository<User,Long> {



    User findByUserName(String userName);


    @Query(
            value = "select base_path as basePath, company as company, company_type as companyType,\n " +
                    "description as description, linked_in as linkedIn, technology as technology,\n " +
                    "website as website, original_path as originalPath\n " +
                    "from user_description where company= :userName ",nativeQuery = true
    )
    UserDescriptionDTO findUserByName(@Param("userName") String userName);
}

