package com.feestverhuur.controller;

import com.feestverhuur.dto.PackageDto;
import com.feestverhuur.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@RequiredArgsConstructor
public class PackageController {

    private final PackageService packageService;

    @GetMapping
    public List<PackageDto> getAll(@RequestParam(required = false) Long categoryId) {
        return packageService.findAll(categoryId);
    }

    @GetMapping("/{id}")
    public PackageDto getById(@PathVariable Long id) {
        return packageService.findById(id);
    }
}
