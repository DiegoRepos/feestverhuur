package com.feestverhuur.controller;

import com.feestverhuur.dto.ItemDto;
import com.feestverhuur.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public List<ItemDto> getAll(@RequestParam(required = false) Long categoryId) {
        return itemService.findAll(categoryId);
    }

    @GetMapping("/{id}")
    public ItemDto getById(@PathVariable Long id) {
        return itemService.findById(id);
    }
}
