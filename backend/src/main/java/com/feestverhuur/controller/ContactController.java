package com.feestverhuur.controller;

import com.feestverhuur.dto.ContactRequest;
import com.feestverhuur.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final EmailService emailService;

    @PostMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void send(@Valid @RequestBody ContactRequest request) {
        emailService.sendContactMessage(request);
    }
}
