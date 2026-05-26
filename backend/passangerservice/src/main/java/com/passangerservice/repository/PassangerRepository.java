package com.passangerservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.passangerservice.entity.Passanger;

public interface PassangerRepository extends JpaRepository<Passanger, String> {

}
