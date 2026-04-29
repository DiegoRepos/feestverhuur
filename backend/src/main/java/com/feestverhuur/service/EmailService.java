package com.feestverhuur.service;

import com.feestverhuur.entity.Booking;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromAddress;

    public void sendBookingConfirmation(Booking booking) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(booking.getCustomer().getEmail());
            message.setSubject("Boekingsbevestiging #" + booking.getId() + " - Feestverhuur");
            message.setText(buildConfirmationText(booking));
            mailSender.send(message);
        } catch (Exception e) {
            log.error("Kon bevestigingsmail niet sturen voor boeking {}: {}", booking.getId(), e.getMessage());
        }
    }

    private String buildConfirmationText(Booking booking) {
        return """
                Beste %s %s,

                Bedankt voor uw boeking bij Feestverhuur!

                Boekingsdetails:
                - Boeking #: %d
                - Periode: %s t/m %s
                - Totaalbedrag: € %.2f
                - Levering: %s

                Wij nemen zo spoedig mogelijk contact met u op ter bevestiging.

                Met vriendelijke groeten,
                Het Feestverhuur Team
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
}
