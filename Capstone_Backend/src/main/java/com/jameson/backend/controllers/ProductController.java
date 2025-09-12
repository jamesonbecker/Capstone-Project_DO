package com.jameson.backend.controllers;

import com.jameson.backend.entities.Product;
import com.jameson.backend.repositories.ProductRepo;
import com.jameson.backend.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final ProductRepo productRepo;

    public ProductController(ProductService productService, ProductRepo productRepo) {
        this.productService = productService;
        this.productRepo = productRepo;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/productCategory/{productCategoryId}")
    public Product createProduct(@RequestBody Product product, @PathVariable Long productCategoryId) {
        return productService.save(product, productCategoryId);
    }

    @PutMapping("/{productId}/productCategory/{productCategoryId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @PathVariable Long productCategoryId, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProductCategory(productId, productCategoryId, product));
    }

    @PutMapping("/{productID}/billOfMaterials/{billId}")
    public ResponseEntity<Product> addProductInventory(@PathVariable Long productID, @PathVariable Long billId, @RequestBody Product updatedProduct) {
        return ResponseEntity.ok(productService.addInventory(productID, billId, updatedProduct));
    }

    @PutMapping("/{productId}")
    public void updateProductIsKit(@PathVariable Long productId, @RequestBody Product product1) {
        Product product = productService.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setKit(true);
        productRepo.save(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
