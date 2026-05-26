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

}
