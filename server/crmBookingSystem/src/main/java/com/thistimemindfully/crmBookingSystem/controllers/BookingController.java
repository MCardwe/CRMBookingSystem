package com.thistimemindfully.crmBookingSystem.controllers;

import com.thistimemindfully.crmBookingSystem.models.Booking;
import com.thistimemindfully.crmBookingSystem.models.User;
import com.thistimemindfully.crmBookingSystem.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
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
    public ResponseEntity<Optional<Booking>> getBookings(@PathVariable Long id){
        return bookingRepository.findById(id).map(foundBooking -> {
           return new ResponseEntity<>(Optional.of(foundBooking), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(Optional.empty(), HttpStatus.NOT_FOUND));
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
        bookingRepository.save(bookingToUpdate);
        return new ResponseEntity<>(bookingToUpdate, HttpStatus.OK);
    }

    @DeleteMapping(value = "/bookings/{id}")
    public ResponseEntity<Booking> deleteBooking(@PathVariable Long id){
        Booking bookingToDelete = bookingRepository.findById(id).get();
        bookingRepository.deleteById(id);
        return new ResponseEntity(bookingToDelete, HttpStatus.OK);
    }

    @GetMapping(value = "/bookings/pending")
    public ResponseEntity<List<Booking>> getAllPendingBookings(){
        return new ResponseEntity<>(bookingRepository.findAllByConfirmedIsFalse(), HttpStatus.OK);
    }
}
