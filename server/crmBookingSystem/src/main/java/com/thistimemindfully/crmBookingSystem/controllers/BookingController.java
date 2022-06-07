package com.thistimemindfully.crmBookingSystem.controllers;

import com.thistimemindfully.crmBookingSystem.esender.EmailService;
import com.thistimemindfully.crmBookingSystem.models.Booking;
import com.thistimemindfully.crmBookingSystem.models.User;
import com.thistimemindfully.crmBookingSystem.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class BookingController {

    //Injecting repository
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    EmailService emailService;

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

    // Query to get all unconfirmed bookings
    @GetMapping(value = "/bookings/pending")
    public ResponseEntity<List<Booking>> getAllPendingBookings(){
        return new ResponseEntity<>(bookingRepository.findAllByConfirmedIsFalse(), HttpStatus.OK);
    }

    // Query to get all booked dates
    @GetMapping(value = "/bookings/booked_dates")
    public ResponseEntity<List<Booking>> getAllBookedDates(){
        List<Booking> allBookings = bookingRepository.findAll();
        ArrayList<String> bookedDates = new ArrayList<>();
        for (Booking booking: allBookings) {
            bookedDates.add(booking.getDate());
        }
        return new ResponseEntity(bookedDates, HttpStatus.OK);
    }

    // Query to get all the bookings for a certain user
    @GetMapping(value = "/bookings/user/{id}")
    public ResponseEntity<List<Booking>> getBookingsForUser(@PathVariable Long id){
        return new ResponseEntity<>(bookingRepository.findAllByUserId(id), HttpStatus.OK);
    }

    @PostMapping(value = "/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking){
        bookingRepository.save(booking);
        emailService.sendMessage("maximillian.cardwell@gmail.com", "New Booking Request", "There has been a booking request placed for " + booking.getDate() + " at " + booking.getTimeSlot() + " by " + booking.getUser().getEmail() + ". Please confirm or reject the booking via the booking service.");
        return new ResponseEntity<>(booking, HttpStatus.CREATED);
    }

    @PutMapping(value = "/bookings/{id}")
    public ResponseEntity<Optional<Booking>> updateBooking(@RequestBody Booking booking, @PathVariable Long id){
        return bookingRepository.findById(id).map(bookingToUpdate -> {
            bookingToUpdate.setDate(booking.getDate());
            bookingToUpdate.setHost(booking.isHost());
            bookingToUpdate.setConfidential(booking.isConfidential());
            bookingToUpdate.setConfirmed(booking.isConfirmed());
            bookingToUpdate.setSetupType(booking.getSetupType());
            bookingToUpdate.setTimeSlot(booking.getTimeSlot());
            bookingRepository.save(bookingToUpdate);
            return new ResponseEntity<>(Optional.of(bookingToUpdate), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(Optional.empty(), HttpStatus.NOT_FOUND));
    }

    //Query to switch booking from unconfirmed to confirmed
    @PutMapping(value = "bookings/{id}/confirm")
    public ResponseEntity<Optional<Booking>> confirmBooking(@PathVariable Long id){
        return bookingRepository.findById(id).map(bookingToConfirm -> {
            bookingToConfirm.setConfirmed(true);
            bookingRepository.save(bookingToConfirm);
            emailService.sendMessage(bookingToConfirm.getUser().getEmail(), "Booking Confirmed!", "Hey! Your booking for the " + bookingToConfirm.getDate() + " at " + bookingToConfirm.getTimeSlot() + " has been confirmed! Thank you for using this service.");
            return new ResponseEntity<>(Optional.of(bookingToConfirm), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(Optional.empty(), HttpStatus.NOT_FOUND));
    }

    @DeleteMapping(value = "/bookings/{id}")
    public ResponseEntity<Optional<Booking>> deleteBooking(@PathVariable Long id){
        return bookingRepository.findById(id).map(bookingToDelete -> {
            bookingRepository.deleteById(bookingToDelete.getId());
            emailService.sendMessage(bookingToDelete.getUser().getEmail(), "Booking Deleted/Rejected", "Hello, this is a confirmation email to notify you that your booking request for the " + bookingToDelete.getDate() + " has been deleted/rejected.");
            return new ResponseEntity<>(Optional.of(bookingToDelete), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(Optional.empty(), HttpStatus.NOT_FOUND));


    }
}
