package com.feestverhuur.dto;

import java.math.BigDecimal;
import java.util.List;

public record PackageDto(
        Long id,
        String name,
        String description,
        BigDecimal priceFrom,
        String formula,
        String imageUrl,
        Boolean isActive,
        CategoryDto category,
        List<PackageItemDto> packageItems
) {}
