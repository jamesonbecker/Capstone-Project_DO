package com.jameson.backend.services;

import com.jameson.backend.entities.ProductCategory;

import java.util.List;
import java.util.Optional;

// Polymorphism
public interface ProductCategoryService {

    List<ProductCategory> findAll();
    Optional<ProductCategory> findById(Long id);
    ProductCategory save(ProductCategory productCategory);
    void delete(Long id);
}
