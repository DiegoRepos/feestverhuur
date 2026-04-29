package com.feestverhuur.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record AdminBookingDto(
        Long id,
        String status,
        LocalDate startDate,
        LocalDate endDate,
        Boolean deliveryRequired,
        String deliveryAddress,
        BigDecimal totalAmount,
        String molliePaymentId,
        LocalDateTime createdAt,
        String notes,
        CustomerDto customer,
        List<BookingLineDto> lines
) {
    public record CustomerDto(String firstName, String lastName, String email, String phone,
                              String address, String city, String postalCode) {}
    public record BookingLineDto(Long itemId, String itemName, Long packageId, String packageName,
                                 Integer quantity, BigDecimal unitPrice) {}
}
