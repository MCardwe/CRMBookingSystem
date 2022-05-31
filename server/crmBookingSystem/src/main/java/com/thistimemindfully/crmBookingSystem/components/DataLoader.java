package com.thistimemindfully.crmBookingSystem.components;

import com.thistimemindfully.crmBookingSystem.models.Booking;
import com.thistimemindfully.crmBookingSystem.models.User;
import com.thistimemindfully.crmBookingSystem.repositories.BookingRepository;
import com.thistimemindfully.crmBookingSystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {


    //Injecting repositories
    @Autowired
    UserRepository userRepository;

    @Autowired
    BookingRepository bookingRepository;

    public DataLoader() {
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {

        //Setting up default admin user
        User admin = new User("maximillian.cardwell@gmail.com", "Max");
        admin.setAdmin(true);
        admin.setAllowedToBook(true);
        userRepository.save(admin);

        // Setting up test random user
        User randomUser = new User("randomguy@gmail.com", "randomer");
        userRepository.save(randomUser);

        //Setting up test booking
        Booking booking1 = new Booking(admin, "26/06/2022", "8-12", false, "Group space open floor", false);
        bookingRepository.save(booking1);

        Booking booking2 = new Booking(randomUser, "22/07/2022", "1-5", true, "One to one therapy space", true);
        bookingRepository.save(booking2);

    }
}
