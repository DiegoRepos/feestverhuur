package com.feestverhuur.dto;

import java.math.BigDecimal;

public record ItemDto(
        Long id,
        String name,
        String description,
        BigDecimal pricePerDay,
        BigDecimal deposit,
        Integer stock,
        String imageUrl,
        Boolean isAvailable,
        CategoryDto category
) {}
