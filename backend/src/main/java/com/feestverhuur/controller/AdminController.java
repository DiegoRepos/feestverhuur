package com.feestverhuur.controller;

import com.feestverhuur.dto.AdminBookingDto;
import com.feestverhuur.dto.ItemDto;
import com.feestverhuur.dto.PackageDto;
import com.feestverhuur.entity.Booking;
import com.feestverhuur.entity.Item;
import com.feestverhuur.entity.RentalPackage;
import com.feestverhuur.repository.CategoryRepository;
import com.feestverhuur.repository.ItemRepository;
import com.feestverhuur.repository.PackageRepository;
import com.feestverhuur.service.BookingService;
import com.feestverhuur.service.ItemService;
import com.feestverhuur.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final BookingService bookingService;
    private final ItemService itemService;
    private final PackageService packageService;
    private final ItemRepository itemRepository;
    private final PackageRepository packageRepository;
    private final CategoryRepository categoryRepository;

    // Boekingen

    @GetMapping("/bookings")
    public List<AdminBookingDto> getAllBookings() {
        return bookingService.findAll().stream().map(bookingService::toAdminDto).toList();
    }

    @PutMapping("/bookings/{id}/status")
    public AdminBookingDto updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Booking.Status status = Booking.Status.valueOf(body.get("status"));
        return bookingService.toAdminDto(bookingService.updateStatus(id, status));
    }

    // Artikelen CRUD

    @GetMapping("/items")
    public List<ItemDto> getAllItems() {
        return itemRepository.findAll().stream().map(itemService::toDto).toList();
    }

    @PostMapping("/items")
    public ItemDto createItem(@RequestBody Item item) {
        if (item.getCategory() != null && item.getCategory().getId() != null) {
            categoryRepository.findById(item.getCategory().getId())
                    .ifPresent(item::setCategory);
        }
        return itemService.save(item);
    }

    @PutMapping("/items/{id}")
    public ItemDto updateItem(@PathVariable Long id, @RequestBody Item updated) {
        Item item = itemService.findEntityById(id);
        item.setName(updated.getName());
        item.setDescription(updated.getDescription());
        item.setPricePerDay(updated.getPricePerDay());
        item.setDeposit(updated.getDeposit());
        item.setStock(updated.getStock());
        item.setImageUrl(updated.getImageUrl());
        item.setIsAvailable(updated.getIsAvailable());
        if (updated.getCategory() != null && updated.getCategory().getId() != null) {
            categoryRepository.findById(updated.getCategory().getId()).ifPresent(item::setCategory);
        }
        return itemService.save(item);
    }

    @DeleteMapping("/items/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.delete(id);
    }

    // Pakketten CRUD

    @GetMapping("/packages")
    public List<PackageDto> getAllPackages() {
        return packageRepository.findAll().stream().map(packageService::toDto).toList();
    }

    @PostMapping("/packages")
    public PackageDto createPackage(@RequestBody RentalPackage pkg) {
        if (pkg.getCategory() != null && pkg.getCategory().getId() != null) {
            categoryRepository.findById(pkg.getCategory().getId()).ifPresent(pkg::setCategory);
        }
        return packageService.save(pkg);
    }

    @PutMapping("/packages/{id}")
    public PackageDto updatePackage(@PathVariable Long id, @RequestBody RentalPackage updated) {
        RentalPackage pkg = packageService.findEntityById(id);
        pkg.setName(updated.getName());
        pkg.setDescription(updated.getDescription());
        pkg.setPriceFrom(updated.getPriceFrom());
        pkg.setFormula(updated.getFormula());
        pkg.setImageUrl(updated.getImageUrl());
        pkg.setIsActive(updated.getIsActive());
        if (updated.getCategory() != null && updated.getCategory().getId() != null) {
            categoryRepository.findById(updated.getCategory().getId()).ifPresent(pkg::setCategory);
        }
        return packageService.save(pkg);
    }

    @DeleteMapping("/packages/{id}")
    public void deletePackage(@PathVariable Long id) {
        packageService.delete(id);
    }
}
