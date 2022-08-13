package com.example.etoiapp.repo;

import com.example.etoiapp.entity.Investor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface InvestorRepo extends JpaRepository<Investor,Long> {
}
