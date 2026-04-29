package com.feestverhuur.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record BookingLineRequest(
        Long itemId,
        Long packageId,
        @NotNull @Min(1) Integer quantity
) {}
