package com.thistimemindfully.crmBookingSystem;

import com.thistimemindfully.crmBookingSystem.models.Booking;
import com.thistimemindfully.crmBookingSystem.models.User;
import com.thistimemindfully.crmBookingSystem.repositories.BookingRepository;
import com.thistimemindfully.crmBookingSystem.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
class CrmBookingSystemApplicationTests {

	@Autowired
	UserRepository userRepository;

	@Autowired
	BookingRepository bookingRepository;

	@Test
	void contextLoads() {
	}

	@Test
	public void canFindAllUsers(){
		List<User> found = userRepository.findAll();
		assertEquals(2, found.size());
	}

	@Test
	public void canFindAllBookings(){
		List<Booking> found = bookingRepository.findAll();
		assertEquals(2, found.size());
	}

	@Test
	public void canFindUserByEmail(){
		List<User> found = userRepository.findUserByEmail("maximillian.cardwell@gmail.com");
		assertEquals(1, found.size());
	}
}
