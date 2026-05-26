package com.bookingservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookingservice.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, String> {

}
