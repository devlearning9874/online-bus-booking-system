package com.busservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.busservice.entity.Bus;

public interface BusRepository extends JpaRepository<Bus, Integer> {

}
