package com.feestverhuur.service;

import com.feestverhuur.dto.ContactRequest;
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

    public void sendContactMessage(ContactRequest req) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(fromAddress);
            message.setReplyTo(req.email());
            message.setSubject("Nieuw contactbericht: " + (req.onderwerp() != null ? req.onderwerp() : "Geen onderwerp"));
            message.setText("""
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
            ));
            mailSender.send(message);
        } catch (Exception e) {
            log.error("Kon contactmail niet sturen: {}", e.getMessage());
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
