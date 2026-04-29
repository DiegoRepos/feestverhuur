package com.feestverhuur.service;

import com.feestverhuur.dto.PackageDto;
import com.feestverhuur.dto.PackageItemDto;
import com.feestverhuur.entity.RentalPackage;
import com.feestverhuur.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PackageService {

    private final PackageRepository packageRepository;
    private final CategoryService categoryService;

    public List<PackageDto> findAll(Long categoryId) {
        List<RentalPackage> packages = categoryId != null
                ? packageRepository.findByCategoryIdAndIsActiveTrue(categoryId)
                : packageRepository.findByIsActiveTrue();
        return packages.stream().map(this::toDto).toList();
    }

    public PackageDto findById(Long id) {
        return packageRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public RentalPackage findEntityById(Long id) {
        return packageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pakket niet gevonden: " + id));
    }

    public PackageDto save(RentalPackage pkg) {
        return toDto(packageRepository.save(pkg));
    }

    public void delete(Long id) {
        packageRepository.deleteById(id);
    }

    public PackageDto toDto(RentalPackage p) {
        List<PackageItemDto> items = p.getPackageItems().stream()
                .map(pi -> new PackageItemDto(pi.getItem().getId(), pi.getItem().getName(), pi.getQuantity()))
                .toList();
        return new PackageDto(
                p.getId(), p.getName(), p.getDescription(), p.getPriceFrom(),
                p.getFormula(), p.getImageUrl(), p.getIsActive(),
                p.getCategory() != null ? categoryService.toDto(p.getCategory()) : null,
                items
        );
    }
}
