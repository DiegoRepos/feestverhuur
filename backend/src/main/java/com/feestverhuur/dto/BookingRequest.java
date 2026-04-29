package com.feestverhuur.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record BookingRequest(
        @NotNull LocalDate startDate,
        @NotNull LocalDate endDate,
        @NotNull Boolean deliveryRequired,
        String deliveryAddress,
        String notes,

        @NotBlank String firstName,
        @NotBlank String lastName,
        @NotBlank @Email String email,
        @NotBlank String phone,
        @NotBlank String address,
        @NotBlank String city,
        @NotBlank String postalCode,

        @NotEmpty @Valid List<BookingLineRequest> lines
) {}
