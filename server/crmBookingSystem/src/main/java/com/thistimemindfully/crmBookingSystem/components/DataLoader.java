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
        User user1 = new User("maximillian.cardwell@gmail.com", "Max");
        user1.setAdmin(true);
        userRepository.save(user1);

        //Setting up test booking
        Booking booking1 = new Booking(user1, "26/05/22", false, "group space open floor", false);
        bookingRepository.save(booking1);


    }
}
