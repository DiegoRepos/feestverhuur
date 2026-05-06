package com.feestverhuur.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.List;

public record BookingRequest(
        @NotNull LocalDate startDate,
        @NotNull LocalDate endDate,
        @NotNull Boolean deliveryRequired,
        @Size(max = 300) String deliveryAddress,
        @Size(max = 1000) String notes,

        @NotBlank @Size(max = 100) String firstName,
        @NotBlank @Size(max = 100) String lastName,
        @NotBlank @Email @Size(max = 200) String email,
        @NotBlank @Size(max = 30) String phone,
        @NotBlank @Size(max = 200) String address,
        @NotBlank @Size(max = 100) String city,
        @NotBlank @Size(max = 20) String postalCode,

        @NotEmpty @Size(max = 50) @Valid List<BookingLineRequest> lines
) {}
