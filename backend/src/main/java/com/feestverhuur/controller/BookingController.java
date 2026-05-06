package com.feestverhuur.controller;

import com.feestverhuur.dto.BookingRequest;
import com.feestverhuur.dto.BookingResponse;
import com.feestverhuur.entity.Booking;
import com.feestverhuur.service.BookingService;
import com.feestverhuur.service.EmailService;
import com.feestverhuur.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Slf4j
public class BookingController {

    private final BookingService bookingService;
    private final PaymentService paymentService;
    private final EmailService emailService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse create(@Valid @RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(request);
        String checkoutUrl = null;
        try {
            checkoutUrl = paymentService.createPayment(booking);
        } catch (Exception e) {
            log.error("Mollie betaling aanmaken mislukt voor boeking {}: {}", booking.getId(), e.getMessage());
        }
        return new BookingResponse(
                booking.getId(), booking.getStatus().name(),
                booking.getStartDate(), booking.getEndDate(),
                booking.getDeliveryRequired(), booking.getTotalAmount(),
                checkoutUrl, booking.getCreatedAt()
        );
    }

    @GetMapping("/{id}/status")
    public BookingResponse getStatus(@PathVariable Long id) {
        Booking booking = bookingService.findById(id);
        return new BookingResponse(
                booking.getId(), booking.getStatus().name(),
                booking.getStartDate(), booking.getEndDate(),
                booking.getDeliveryRequired(), booking.getTotalAmount(),
                null, booking.getCreatedAt()
        );
    }
}
