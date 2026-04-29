package com.feestverhuur.service;

import com.feestverhuur.entity.Booking;
import com.feestverhuur.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    @Value("${mollie.api.key}")
    private String mollieApiKey;

    @Value("${app.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate;
    private final BookingRepository bookingRepository;

    @SuppressWarnings("unchecked")
    public String createPayment(Booking booking) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(mollieApiKey);

        Map<String, Object> body = Map.of(
                "amount", Map.of("currency", "EUR", "value", String.format("%.2f", booking.getTotalAmount())),
                "description", "Feestverhuur boeking #" + booking.getId(),
                "redirectUrl", baseUrl + "/betaling/succes?bookingId=" + booking.getId(),
                "webhookUrl", baseUrl + "/api/payments/webhook",
                "metadata", Map.of("bookingId", booking.getId())
        );

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.mollie.com/v2/payments",
                HttpMethod.POST,
                new HttpEntity<>(body, headers),
                Map.class
        );

        Map<String, Object> responseBody = response.getBody();
        String paymentId = (String) responseBody.get("id");
        Map<String, Object> links = (Map<String, Object>) responseBody.get("_links");
        Map<String, Object> checkout = (Map<String, Object>) links.get("checkout");
        String checkoutUrl = (String) checkout.get("href");

        booking.setMolliePaymentId(paymentId);
        bookingRepository.save(booking);

        return checkoutUrl;
    }

    @SuppressWarnings("unchecked")
    public String getPaymentStatus(String paymentId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(mollieApiKey);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.mollie.com/v2/payments/" + paymentId,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Map.class
        );
        return (String) response.getBody().get("status");
    }
}
