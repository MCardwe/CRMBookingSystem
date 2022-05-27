package com.thistimemindfully.crmBookingSystem.repositories;

import com.thistimemindfully.crmBookingSystem.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
