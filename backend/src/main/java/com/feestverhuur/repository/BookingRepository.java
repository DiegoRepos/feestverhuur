package com.feestverhuur.repository;

import com.feestverhuur.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findByMolliePaymentId(String molliePaymentId);

    @Query("""
        SELECT bl.item.id FROM BookingLine bl
        JOIN bl.booking b
        WHERE b.status IN ('PAID', 'CONFIRMED')
        AND b.startDate <= :endDate AND b.endDate >= :startDate
        AND bl.item IS NOT NULL
        """)
    List<Long> findBookedItemIdsBetween(@Param("startDate") LocalDate startDate,
                                        @Param("endDate") LocalDate endDate);

    @Query("""
        SELECT bl.rentalPackage.id FROM BookingLine bl
        JOIN bl.booking b
        WHERE b.status IN ('PAID', 'CONFIRMED')
        AND b.startDate <= :endDate AND b.endDate >= :startDate
        AND bl.rentalPackage IS NOT NULL
        """)
    List<Long> findBookedPackageIdsBetween(@Param("startDate") LocalDate startDate,
                                           @Param("endDate") LocalDate endDate);
}
