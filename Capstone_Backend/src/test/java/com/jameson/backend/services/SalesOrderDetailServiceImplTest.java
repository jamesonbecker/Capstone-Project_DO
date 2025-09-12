package com.jameson.backend.services;

import com.jameson.backend.entities.Inventory;
import com.jameson.backend.entities.Product;
import com.jameson.backend.entities.SalesOrder;
import com.jameson.backend.entities.SalesOrderDetail;
import com.jameson.backend.repositories.InventoryRepo;
import com.jameson.backend.repositories.ProductRepo;
import com.jameson.backend.repositories.SalesOrderDetailRepo;
import com.jameson.backend.repositories.SalesOrderRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SalesOrderDetailServiceImplTest {

    @Mock
    private SalesOrderDetailRepo salesOrderDetailRepo;

    @Mock
    private ProductRepo productRepo;

    @Mock
    private SalesOrderRepo salesOrderRepo;

    @Mock
    private InventoryRepo inventoryRepo;

    @InjectMocks
    private SalesOrderDetailServiceImpl salesOrderDetailService;

    private Product product;
    private SalesOrder salesOrder;
    private Inventory inventory;

    @BeforeEach
    void setUp() {
        product = new Product();
        product.setId(1L);
        product.setSku("TEST-PRODUCT-SKU");
        product.setUnitsInStock(5);

        salesOrder = new SalesOrder();
        salesOrder.setId(1L);

        inventory = new Inventory();
    }

    @Test
    void testCreateOrderDetail_WithQuantityExceedingAvailable_ThrowsException() {

        SalesOrderDetail salesOrderDetail = new SalesOrderDetail();
        salesOrderDetail.setProduct(product);
        salesOrderDetail.setQuantityOrdered(10);

        when(productRepo.findById(1L)).thenReturn(java.util.Optional.of(product));

        Exception exception = assertThrows(RuntimeException.class, () -> {
            salesOrderDetailService.save(salesOrderDetail, salesOrder.getId());
        });

        assertEquals("Not enough available quantity for TEST-PRODUCT-SKU", exception.getMessage());

        verify(productRepo, never()).save(any(Product.class));
        verify(salesOrderRepo, never()).save(any(SalesOrder.class));
        verify(salesOrderDetailRepo, never()).save(any(SalesOrderDetail.class));
        verify(inventoryRepo, never()).save(any(Inventory.class));
    }

    @Test
    void testCreateOrderDetail_WithValidQuantity_Success() {

        SalesOrderDetail salesOrderDetail = new SalesOrderDetail();
        salesOrderDetail.setProduct(product);
        salesOrderDetail.setQuantityOrdered(3);

        when(productRepo.findById(1L)).thenReturn(java.util.Optional.of(product));
        when(productRepo.save(any(Product.class))).thenReturn(product);
        when(salesOrderRepo.findById(1L)).thenReturn(java.util.Optional.of(salesOrder));
        when(salesOrderDetailRepo.save(any(SalesOrderDetail.class))).thenReturn(salesOrderDetail);
        when(inventoryRepo.save(any(Inventory.class))).thenReturn(inventory);

        SalesOrderDetail result = salesOrderDetailService.save(salesOrderDetail, salesOrder.getId());

        assertNotNull(result);
        assertEquals(2, product.getUnitsInStock(), "Available quantity should be 2");

        verify(productRepo, times(1)).save(any(Product.class));
        verify(salesOrderDetailRepo, times(1)).save(any(SalesOrderDetail.class));
        verify(inventoryRepo, times(1)).save(any(Inventory.class));
    }
}