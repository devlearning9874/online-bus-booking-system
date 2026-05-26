package com.inventoryservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.inventoryservice.entity.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, String> {
	
	@Query("FROM Inventory where busId=?1")
	public List<Inventory> findInventoryByBusId(String busId);

}
