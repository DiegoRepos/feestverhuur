package com.feestverhuur.controller;

import com.feestverhuur.dto.CategoryDto;
import com.feestverhuur.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public List<CategoryDto> getAll() {
        return categoryService.findAll();
    }
}
