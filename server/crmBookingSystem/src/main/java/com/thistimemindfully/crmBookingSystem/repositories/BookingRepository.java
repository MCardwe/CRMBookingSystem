package com.thistimemindfully.crmBookingSystem.repositories;

import com.thistimemindfully.crmBookingSystem.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Creating custom query function to find all bookings that have not yet been confirmed

    List<Booking> findAllByConfirmedIsFalse();
    List<Booking> findAllByUserId(Long id);
}
