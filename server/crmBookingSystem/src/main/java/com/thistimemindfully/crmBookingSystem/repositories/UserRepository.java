package com.thistimemindfully.crmBookingSystem.repositories;

import com.thistimemindfully.crmBookingSystem.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
