package com.thistimemindfully.crmBookingSystem.controllers;

import com.thistimemindfully.crmBookingSystem.models.Booking;
import com.thistimemindfully.crmBookingSystem.models.User;
import com.thistimemindfully.crmBookingSystem.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BookingController {

    //Injecting repository
    @Autowired
    BookingRepository bookingRepository;

    //Creating the custom routes
    @GetMapping(value = "/bookings")
    public ResponseEntity<List<Booking>> getAllBookings(){
        return new ResponseEntity<>(bookingRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/bookings/{id}")
    public ResponseEntity<Booking> getBookings(@PathVariable Long id){
        Optional<Booking> foundBooking = bookingRepository.findById(id);
        return new ResponseEntity(foundBooking, HttpStatus.OK);
    }

    @PostMapping(value = "/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking){
        bookingRepository.save(booking);
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @PutMapping(value = "/bookings/{id}")
    public ResponseEntity<Booking> updateBooking(@RequestBody Booking booking, @PathVariable Long id){
        Booking bookingToUpdate = bookingRepository.findById(id).get();
        bookingToUpdate.setDate(booking.getDate());
        bookingToUpdate.setHost(booking.isHost());
        bookingToUpdate.setConfidential(booking.isConfidential());
        bookingToUpdate.setConfirmed(booking.isConfirmed());
        bookingToUpdate.setSetupType(booking.getSetupType());
        bookingToUpdate.setUser(booking.getUser());
        bookingRepository.save(bookingToUpdate);
        return new ResponseEntity<>(bookingToUpdate, HttpStatus.OK);
    }

    @DeleteMapping(value = "/bookings/{id}")
    public ResponseEntity<Booking> deleteBooking(@PathVariable Long id){
        Booking bookingToDelete = bookingRepository.findById(id).get();
        bookingRepository.deleteById(id);
        return new ResponseEntity(bookingToDelete, HttpStatus.OK);
    }
}
