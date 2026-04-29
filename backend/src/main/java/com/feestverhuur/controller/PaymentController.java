package com.feestverhuur.controller;

import com.feestverhuur.entity.Booking;
import com.feestverhuur.service.BookingService;
import com.feestverhuur.service.EmailService;
import com.feestverhuur.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;
    private final BookingService bookingService;
    private final EmailService emailService;

    @PostMapping("/webhook")
    public ResponseEntity<Void> mollieWebhook(@RequestParam String id) {
        try {
            String status = paymentService.getPaymentStatus(id);
            Booking booking = bookingService.findByMolliePaymentId(id);

            if ("paid".equals(status) && booking.getStatus() == Booking.Status.PENDING) {
                bookingService.updateStatus(booking.getId(), Booking.Status.PAID);
                emailService.sendBookingConfirmation(booking);
            } else if ("canceled".equals(status) || "expired".equals(status) || "failed".equals(status)) {
                bookingService.updateStatus(booking.getId(), Booking.Status.CANCELLED);
            }
        } catch (Exception e) {
            log.error("Fout bij verwerken Mollie webhook voor betaling {}: {}", id, e.getMessage());
        }
        return ResponseEntity.ok().build();
    }
}
