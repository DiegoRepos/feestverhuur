package com.feestverhuur.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank @Size(max = 100) String naam,
        @Email @NotBlank @Size(max = 200) String email,
        @Size(max = 30) String telefoon,
        @Size(max = 150) String onderwerp,
        @NotBlank @Size(max = 5000) String bericht
) {}
