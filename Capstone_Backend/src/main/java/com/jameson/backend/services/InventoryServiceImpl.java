package com.jameson.backend.services;

import com.jameson.backend.entities.Inventory;
import com.jameson.backend.entities.Product;
import com.jameson.backend.repositories.InventoryRepo;
import com.jameson.backend.repositories.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Polymorphism
@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepo inventoryRepo;
    private final ProductRepo productRepo;

    public InventoryServiceImpl(InventoryRepo inventoryRepo, ProductRepo productRepo) {
        this.inventoryRepo = inventoryRepo;
        this.productRepo = productRepo;
    }

    @Override
    public List<Inventory> findAll() {
        return inventoryRepo.findAll();
    }

    @Override
    public List<Inventory> findByProductId(Long productId) {
        return inventoryRepo.findByProductId(productId);
    }

    @Override
    public List<Inventory> findTopFive(int limit) {
        return inventoryRepo.getTopFive(limit);
    }

    @Override
    public Inventory save(Inventory inventory, Long productId) {
        Optional<Product> product = productRepo.findById(productId);
        if (product.isPresent()) {
            inventory.setProduct(product.get());
            return inventoryRepo.save(inventory);
        } else {
            throw new RuntimeException("Product not found");
        }
    }

    @Override
    public void delete(Long id) {
        inventoryRepo.deleteById(id);
    }
}