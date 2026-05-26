package com.bookingservice.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @Column(name = "booking_id", length = 50)
    private String bookingId;

    @Column(name = "bus_id", nullable = false)
    private int busId; // Matches the 'int' type in your MySQL desc

    @Column(name = "date_of_booking", nullable = false)
    private Date dateOfBooking;

    @Column(name = "source", length = 100, nullable = false)
    private String source;

    @Column(name = "destination", length = 100, nullable = false)
    private String destination;

    @Column(name = "no_of_seats", nullable = false)
    private int noOfSeats;

    @Column(name = "status", length = 50, nullable = false)
    private String status;

    @Column(name = "username", length = 100, nullable = false)
    private String username; // Captured from API Gateway's X-User-Name header

    // --- Getters and Setters ---

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public int getBusId() {
        return busId;
    }

    public void setBusId(int busId) {
        this.busId = busId;
    }

    public Date getDateOfBooking() {
        return dateOfBooking;
    }

    public void setDateOfBooking(Date dateOfBooking) {
        this.dateOfBooking = dateOfBooking;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public int getNoOfSeats() {
        return noOfSeats;
    }

    public void setNoOfSeats(int noOfSeats) {
        this.noOfSeats = noOfSeats;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}