package com.jameson.backend.services;

import com.jameson.backend.entities.Product;
import com.jameson.backend.entities.ProductCategory;
import com.jameson.backend.repositories.ProductCategoryRepo;
import com.jameson.backend.repositories.ProductRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepo productRepo;

    @Mock
    private ProductCategoryRepo productCategoryRepo;

    @InjectMocks
    private ProductServiceImpl productService;

    private ProductCategory productCategory;

    @BeforeEach
    void setUp() {
        productCategory = new ProductCategory();
        productCategory.setId(1L);
        productCategory.setName("Test Category");
    }

    @Test
    void testCreateProduct_WithInvalidProductCategory_ThrowsException() {
        Product product = new Product();
        product.setId(1L);
        product.setSku("TEST-PRODUCT-SKU");

        Exception exception = assertThrows(RuntimeException.class, () -> {
            productService.save(product, 9L);
        });

        assertEquals("Product category not found", exception.getMessage());
        verify(productRepo, never()).save(any(Product.class));
    }

    @Test
    void testCreateProduct_WithValidProductCategory_Success() {
        Product product = new Product();
        product.setId(1L);
        product.setSku("TEST-PRODUCT-SKU");

        when(productCategoryRepo.findById(1L)).thenReturn(java.util.Optional.of(productCategory));
        when(productRepo.save(any(Product.class))).thenReturn(product);

        Product result = productService.save(product, productCategory.getId());
        assertNotNull(result, "Product should be created successfully");

        verify(productRepo, times(1)).save(any(Product.class));
    }
}