package com.feestverhuur.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record BookingResponse(
        Long id,
        String status,
        LocalDate startDate,
        LocalDate endDate,
        Boolean deliveryRequired,
        BigDecimal totalAmount,
        String checkoutUrl,
        LocalDateTime createdAt
) {}
