package com.example.etoiapp.repo;

import com.example.etoiapp.entity.Post;
import com.example.etoiapp.projections.PostDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post,Long> {


    @Query(
            value = "select id as id,project_name as projectName, description as description, type as type, investment_found as investmentfound,investment_needed as investmentneeded,banner_path as bannerPath,root_path as rootPath,date as date \n "+
                    "from post where post.name= :username order by id desc", nativeQuery = true
    )
    List<PostDTO> findUserPost(@Param("username") String username);


    @Query(
            value = "select id as id,project_name as projectName, description as description, name as companyName," +
                    " type as type, investment_found as investmentfound,investment_needed as investmentneeded, " +
                    "banner_path as bannerPath,root_path as rootPath, date as date \n"+
                    "from post order by id desc",nativeQuery = true

    )
    List<PostDTO> findAllPost();


//     List<Post> findAllByName(String name);

   // Post findPostByName(String name);
    //List<Post> findPostByName(String name);


}
