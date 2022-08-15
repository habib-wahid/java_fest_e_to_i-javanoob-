package com.example.etoiapp.repo;

import com.example.etoiapp.entity.InvestmentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestmentRepo extends JpaRepository<InvestmentDetails,Long> {
}
