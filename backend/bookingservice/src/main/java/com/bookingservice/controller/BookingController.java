package com.bookingservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bookingservice.entity.Booking;
import com.bookingservice.service.BookingService;

@RestController
@RequestMapping("/bookings") // 👈 Moves the base path here to match the Gateway predicate exactly
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    // Maps to: GET http://localhost:3500/bookings
    @GetMapping
    public String getBookings() {
        return "bk1, bk2, bk3";
    }
    
    // Maps to: POST http://localhost:3500/bookings
    @PostMapping
    public String createBooking(@RequestBody Booking booking, 
                                @RequestHeader(value = "X-User-Name", required = false) String username) {
        
        System.out.println("Triggered! Processing booking for user: " + username);
        
        // You can assign the extracted username to your booking entity before saving it
        // booking.setCreatedBy(username); 
        
        return bookingService.createBooking(booking);
    }
}