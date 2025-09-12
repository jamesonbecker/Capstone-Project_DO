package com.jameson.backend.services;

import com.jameson.backend.entities.Product;

import java.util.List;
import java.util.Optional;

// Polymorphism
public interface ProductService {

    List<Product> findAll();
    Optional<Product> findById(Long id);
    Product save(Product product, Long productCategoryId);
    Product updateProductCategory(Long productId, Long productCategoryId, Product product);
    Product addInventory(Long productId, Long billId, Product updatedProduct);
    void delete(Long id);
}
