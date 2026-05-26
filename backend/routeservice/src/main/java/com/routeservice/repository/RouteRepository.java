package com.routeservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.routeservice.entity.Route;

public interface RouteRepository extends JpaRepository<Route, String> {

}
