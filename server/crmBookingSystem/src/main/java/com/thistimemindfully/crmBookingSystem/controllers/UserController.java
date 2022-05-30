package com.thistimemindfully.crmBookingSystem.controllers;

import com.thistimemindfully.crmBookingSystem.models.Booking;
import com.thistimemindfully.crmBookingSystem.models.User;
import com.thistimemindfully.crmBookingSystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    //Injecting the repository
    @Autowired
    UserRepository userRepository;

    //Creating the custom routes

    @GetMapping(value = "/users")
    public ResponseEntity<List<User>> getAllUsers(@RequestParam (name = "email", required = false) String email){

        if (email != null){
            return new ResponseEntity<>(userRepository.findUserByEmail(email), HttpStatus.OK);
        }

        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/users/{id}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable Long id){
        return userRepository.findById(id).map(foundUser -> {
            return new ResponseEntity<>(Optional.of(foundUser), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(Optional.empty(), HttpStatus.NOT_FOUND));
    }

    @PostMapping(value = "/users")
    public ResponseEntity<User> createUser(@RequestBody User user){
        userRepository.save(user);
        User newUser = userRepository.findUserByEmail(user.getEmail()).get(0);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping(value = "/users/{id}")
    public ResponseEntity<Optional<User>> updateUser(@RequestBody User user, @PathVariable Long id){
        return userRepository.findById(id).map(userToUpdate -> {
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setName(user.getName());
            userToUpdate.setAdmin(user.isAdmin());
            userToUpdate.setAllowedToBook(user.isAllowedToBook());
            userRepository.save(userToUpdate);
            return new ResponseEntity<>(Optional.of(userToUpdate), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(Optional.empty(), HttpStatus.NOT_FOUND));
    }

    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<Optional<User>> deleteUser(@PathVariable Long id){
        return userRepository.findById(id).map(userToDelete -> {
            userRepository.deleteById(userToDelete.getId());
            return new ResponseEntity<>(Optional.of(userToDelete), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(Optional.empty(), HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/users/pending")
    public ResponseEntity<List<User>> getAllPendingUsers(){
        return new ResponseEntity<>(userRepository.findByIsAllowedToBookIsFalse(), HttpStatus.OK);
    }
}
