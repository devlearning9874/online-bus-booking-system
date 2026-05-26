package com.passangerservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="passanger")
public class Passanger {
	
	@Id
	@Column(name="pas_id")
	private String passangerId;
	
	@Column(name="booking_id")
	private String bookingId;
	
	
	public String getPassangerId() {
		return passangerId;
	}
	public void setPassangerId(String passangerId) {
		this.passangerId = passangerId;
	}
	public String getBookingId() {
		return bookingId;
	}
	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}
	

}
