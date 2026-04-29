package com.feestverhuur.repository;

import com.feestverhuur.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByCategoryId(Long categoryId);
    List<Item> findByIsAvailableTrue();
    List<Item> findByCategoryIdAndIsAvailableTrue(Long categoryId);
}
