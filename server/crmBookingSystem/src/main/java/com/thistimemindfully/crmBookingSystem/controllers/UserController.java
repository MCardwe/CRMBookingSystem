package com.thistimemindfully.crmBookingSystem.controllers;

import com.thistimemindfully.crmBookingSystem.models.Booking;
import com.thistimemindfully.crmBookingSystem.models.User;
import com.thistimemindfully.crmBookingSystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Booking> getUser(@PathVariable Long id){
        Optional<User> foundUser = userRepository.findById(id);
        return new ResponseEntity(foundUser, HttpStatus.OK);
    }

    @PostMapping(value = "/users")
    public ResponseEntity<User> createUser(@RequestBody User user){
//        List<User> allUsers = userRepository.findAll();
//
//        for (User selectedUser: allUsers){
//            if (user.getEmail() == selectedUser.getEmail()){
//                return new ResponseEntity<>(selectedUser, HttpStatus.OK);
//            }
//        }
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping(value = "/users/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Long id){
        User userToUpdate = userRepository.findById(id).get();
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setName(user.getName());
        userToUpdate.setAdmin(user.isAdmin());
        userToUpdate.setAllowedToBook(user.isAllowedToBook());
        userToUpdate.setBookings(user.getBookings());
        userRepository.save(userToUpdate);
        return new ResponseEntity<>(userToUpdate, HttpStatus.OK);
    }

    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id){
        User userToDelete = userRepository.findById(id).get();
        userRepository.deleteById(id);
        return new ResponseEntity(id, HttpStatus.OK);
    }
}
