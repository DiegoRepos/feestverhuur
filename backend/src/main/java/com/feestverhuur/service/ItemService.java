package com.feestverhuur.service;

import com.feestverhuur.dto.ItemDto;
import com.feestverhuur.entity.Item;
import com.feestverhuur.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryService categoryService;

    public List<ItemDto> findAll(Long categoryId) {
        List<Item> items = categoryId != null
                ? itemRepository.findByCategoryIdAndIsAvailableTrue(categoryId)
                : itemRepository.findByIsAvailableTrue();
        return items.stream().map(this::toDto).toList();
    }

    public ItemDto findById(Long id) {
        return itemRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Item findEntityById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item niet gevonden: " + id));
    }

    public ItemDto save(Item item) {
        return toDto(itemRepository.save(item));
    }

    public void delete(Long id) {
        itemRepository.deleteById(id);
    }

    public ItemDto toDto(Item i) {
        return new ItemDto(
                i.getId(), i.getName(), i.getDescription(),
                i.getPricePerDay(), i.getDeposit(), i.getStock(),
                i.getImageUrl(), i.getIsAvailable(),
                i.getCategory() != null ? categoryService.toDto(i.getCategory()) : null
        );
    }
}
