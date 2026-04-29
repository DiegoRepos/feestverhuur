package com.feestverhuur.repository;

import com.feestverhuur.entity.RentalPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PackageRepository extends JpaRepository<RentalPackage, Long> {
    List<RentalPackage> findByCategoryId(Long categoryId);
    List<RentalPackage> findByIsActiveTrue();
    List<RentalPackage> findByCategoryIdAndIsActiveTrue(Long categoryId);
}
