package com.feestverhuur.service;

import com.feestverhuur.dto.CategoryDto;
import com.feestverhuur.entity.Category;
import com.feestverhuur.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDto> findAll() {
        return categoryRepository.findAll().stream().map(this::toDto).toList();
    }

    public CategoryDto toDto(Category c) {
        return new CategoryDto(c.getId(), c.getName(), c.getDisplayName(), c.getDescription());
    }
}
