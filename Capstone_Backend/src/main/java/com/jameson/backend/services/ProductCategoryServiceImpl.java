package com.jameson.backend.services;

import com.jameson.backend.entities.ProductCategory;
import com.jameson.backend.repositories.ProductCategoryRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Polymorphism
@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

    private final ProductCategoryRepo productCategoryRepo;

    public ProductCategoryServiceImpl(ProductCategoryRepo productCategoryRepo) {
        this.productCategoryRepo = productCategoryRepo;
    }

    @Override
    public List<ProductCategory> findAll() {
        return productCategoryRepo.findAll();
    }

    @Override
    public Optional<ProductCategory> findById(Long id) {
        return productCategoryRepo.findById(id);
    }

    @Override
    public ProductCategory save(ProductCategory productCategory) {
        return productCategoryRepo.save(productCategory);
    }

    @Override
    public void delete(Long id) {
        productCategoryRepo.deleteById(id);
    }
}
