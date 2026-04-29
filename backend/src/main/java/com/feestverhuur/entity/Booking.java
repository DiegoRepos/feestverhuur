package com.feestverhuur.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
@Data
public class Booking {

    public enum Status {
        PENDING, PAID, CONFIRMED, CANCELLED, REFUNDED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Boolean deliveryRequired = false;

    private String deliveryAddress;

    private String molliePaymentId;

    @Column(nullable = false)
    private BigDecimal totalAmount;

    @Embedded
    private Customer customer;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private String notes;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookingLine> bookingLines = new ArrayList<>();
}
