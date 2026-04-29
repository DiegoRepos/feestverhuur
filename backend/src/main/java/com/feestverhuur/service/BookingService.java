package com.feestverhuur.service;

import com.feestverhuur.dto.*;
import com.feestverhuur.entity.*;
import com.feestverhuur.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ItemService itemService;
    private final PackageService packageService;

    @Transactional
    public Booking createBooking(BookingRequest req) {
        if (req.startDate().isAfter(req.endDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Startdatum moet voor einddatum liggen");
        }

        long days = ChronoUnit.DAYS.between(req.startDate(), req.endDate()) + 1;

        Booking booking = new Booking();
        booking.setStartDate(req.startDate());
        booking.setEndDate(req.endDate());
        booking.setDeliveryRequired(req.deliveryRequired());
        booking.setDeliveryAddress(req.deliveryAddress());
        booking.setNotes(req.notes());

        Customer customer = new Customer();
        customer.setFirstName(req.firstName());
        customer.setLastName(req.lastName());
        customer.setEmail(req.email());
        customer.setPhone(req.phone());
        customer.setAddress(req.address());
        customer.setCity(req.city());
        customer.setPostalCode(req.postalCode());
        booking.setCustomer(customer);

        BigDecimal total = BigDecimal.ZERO;
        for (BookingLineRequest lineReq : req.lines()) {
            BookingLine line = new BookingLine();
            line.setBooking(booking);
            line.setQuantity(lineReq.quantity());

            if (lineReq.itemId() != null) {
                Item item = itemService.findEntityById(lineReq.itemId());
                line.setItem(item);
                line.setUnitPrice(item.getPricePerDay().multiply(BigDecimal.valueOf(days)));
                total = total.add(line.getUnitPrice().multiply(BigDecimal.valueOf(lineReq.quantity())));
            } else if (lineReq.packageId() != null) {
                RentalPackage pkg = packageService.findEntityById(lineReq.packageId());
                line.setRentalPackage(pkg);
                line.setUnitPrice(pkg.getPriceFrom());
                total = total.add(line.getUnitPrice().multiply(BigDecimal.valueOf(lineReq.quantity())));
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Elke boekingsregel vereist een item of pakket");
            }
            booking.getBookingLines().add(line);
        }
        booking.setTotalAmount(total);
        return bookingRepository.save(booking);
    }

    public Booking findById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public Booking findByMolliePaymentId(String paymentId) {
        return bookingRepository.findByMolliePaymentId(paymentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Transactional
    public Booking updateStatus(Long id, Booking.Status status) {
        Booking booking = findById(id);
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    public AdminBookingDto toAdminDto(Booking b) {
        AdminBookingDto.CustomerDto cDto = new AdminBookingDto.CustomerDto(
                b.getCustomer().getFirstName(), b.getCustomer().getLastName(),
                b.getCustomer().getEmail(), b.getCustomer().getPhone(),
                b.getCustomer().getAddress(), b.getCustomer().getCity(),
                b.getCustomer().getPostalCode()
        );
        List<AdminBookingDto.BookingLineDto> lines = b.getBookingLines().stream()
                .map(l -> new AdminBookingDto.BookingLineDto(
                        l.getItem() != null ? l.getItem().getId() : null,
                        l.getItem() != null ? l.getItem().getName() : null,
                        l.getRentalPackage() != null ? l.getRentalPackage().getId() : null,
                        l.getRentalPackage() != null ? l.getRentalPackage().getName() : null,
                        l.getQuantity(), l.getUnitPrice()
                )).toList();
        return new AdminBookingDto(
                b.getId(), b.getStatus().name(), b.getStartDate(), b.getEndDate(),
                b.getDeliveryRequired(), b.getDeliveryAddress(), b.getTotalAmount(),
                b.getMolliePaymentId(), b.getCreatedAt(), b.getNotes(), cDto, lines
        );
    }
}
