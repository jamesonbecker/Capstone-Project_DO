package com.jameson.backend.services;

import com.jameson.backend.entities.Inventory;

import java.util.List;

// Polymorphism
public interface InventoryService {

    List<Inventory> findAll();
    List<Inventory> findByProductId(Long productId);
    List<Inventory> findTopFive(int limit);
    Inventory save(Inventory inventory, Long productId);
    void delete(Long id);
}