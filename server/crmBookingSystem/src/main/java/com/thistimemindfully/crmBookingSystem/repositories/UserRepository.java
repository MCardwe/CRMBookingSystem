package com.thistimemindfully.crmBookingSystem.repositories;

import com.thistimemindfully.crmBookingSystem.models.Booking;
import com.thistimemindfully.crmBookingSystem.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    //Creating custom query routes

    List<User> findUserByEmail(String email);

    // Creating a query to find all pending users waiting to be given permission to see timeslots

    List<User> findByIsAllowedToBookIsFalse();
}
