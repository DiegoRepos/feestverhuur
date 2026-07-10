package com.feestverhuur.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.feestverhuur.dto.ContactRequest;
import com.feestverhuur.entity.Booking;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class EmailService {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${app.mail.from-address}")
    private String fromAddress;

    @Value("${resend.api-key}")
    private String resendApiKey;

    @Value("${app.mail.offertes-address}")
    private String offertesAddress;

    @Value("${app.mail.boekingen-address}")
    private String boekingenAddress;

    public void sendNewBookingNotification(Booking booking) {
        send(boekingenAddress, booking.getCustomer().getEmail(),
                "Nieuwe boeking #" + booking.getId() + " - ZYVENTO",
                buildNewBookingNotificationText(booking),
                "boekingsnotificatie voor boeking " + booking.getId());
    }

    public void sendBookingConfirmation(Booking booking) {
        send(booking.getCustomer().getEmail(), null,
                "Boekingsbevestiging #" + booking.getId() + " - ZYVENTO",
                buildConfirmationText(booking),
                "bevestigingsmail voor boeking " + booking.getId());
    }

    public void sendContactMessage(ContactRequest req) {
        send(offertesAddress, req.email(),
                "Nieuw contactbericht: " + (req.onderwerp() != null ? req.onderwerp() : "Geen onderwerp"),
                """
                Nieuw bericht via het contactformulier:

                Naam:      %s
                E-mail:    %s
                Telefoon:  %s
                Onderwerp: %s

                Bericht:
                %s
                """.formatted(
                        req.naam(),
                        req.email(),
                        req.telefoon() != null ? req.telefoon() : "-",
                        req.onderwerp() != null ? req.onderwerp() : "-",
                        req.bericht()
                ),
                "contactmail");
    }

    private void send(String to, String replyTo, String subject, String text, String context) {
        try {
            Map<String, Object> body = new LinkedHashMap<>();
            body.put("from", "ZYVENTO <" + fromAddress + ">");
            body.put("to", List.of(to));
            if (replyTo != null) {
                body.put("reply_to", replyTo);
            }
            body.put("subject", subject);
            body.put("text", text);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.resend.com/emails"))
                    .timeout(Duration.ofSeconds(10))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 300) {
                log.error("Kon {} niet sturen: HTTP {} - {}", context, response.statusCode(), response.body());
            }
        } catch (Exception e) {
            log.error("Kon {} niet sturen: {}", context, e.getMessage());
        }
    }

    private String buildConfirmationText(Booking booking) {
        return """
                Beste %s %s,

                Bedankt voor uw boeking bij ZYVENTO!

                Boekingsdetails:
                - Boeking #: %d
                - Periode: %s t/m %s
                - Totaalbedrag: € %.2f
                - Levering: %s

                Wij nemen zo spoedig mogelijk contact met u op ter bevestiging.

                Met vriendelijke groeten,
                Het ZYVENTO Team
                """.formatted(
                booking.getCustomer().getFirstName(),
                booking.getCustomer().getLastName(),
                booking.getId(),
                booking.getStartDate(),
                booking.getEndDate(),
                booking.getTotalAmount(),
                booking.getDeliveryRequired() ? "Ja, naar " + booking.getDeliveryAddress() : "Afhaling"
        );
    }

    private String buildNewBookingNotificationText(Booking booking) {
        StringBuilder items = new StringBuilder();
        for (var line : booking.getBookingLines()) {
            String naam = line.getItem() != null ? line.getItem().getName()
                    : (line.getRentalPackage() != null ? line.getRentalPackage().getName() : "Onbekend");
            items.append("- %s x%d (€ %.2f)%n".formatted(naam, line.getQuantity(), line.getUnitPrice()));
        }

        return """
                Nieuwe boeking binnengekomen via de website!

                Boeking #: %d
                Periode: %s t/m %s
                Totaalbedrag: € %.2f
                Levering: %s
                Opmerkingen: %s

                Klantgegevens:
                %s %s
                E-mail: %s
                Telefoon: %s
                Adres: %s, %s %s

                Bestelde items:
                %s
                """.formatted(
                booking.getId(),
                booking.getStartDate(),
                booking.getEndDate(),
                booking.getTotalAmount(),
                booking.getDeliveryRequired() ? "Ja, naar " + booking.getDeliveryAddress() : "Afhaling",
                booking.getNotes() != null ? booking.getNotes() : "-",
                booking.getCustomer().getFirstName(),
                booking.getCustomer().getLastName(),
                booking.getCustomer().getEmail(),
                booking.getCustomer().getPhone(),
                booking.getCustomer().getAddress(),
                booking.getCustomer().getPostalCode(),
                booking.getCustomer().getCity(),
                items.toString()
        );
    }
}
