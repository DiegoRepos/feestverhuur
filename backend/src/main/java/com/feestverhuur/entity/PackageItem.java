package com.feestverhuur.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "package_items")
@Data
public class PackageItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = false)
    private RentalPackage rentalPackage;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(nullable = false)
    private Integer quantity;
}
