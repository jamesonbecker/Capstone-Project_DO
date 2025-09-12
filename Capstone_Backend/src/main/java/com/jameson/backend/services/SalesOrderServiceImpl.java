package com.jameson.backend.services;

import com.jameson.backend.entities.Inventory;
import com.jameson.backend.entities.Product;
import com.jameson.backend.entities.SalesOrder;
import com.jameson.backend.entities.SalesOrderDetail;
import com.jameson.backend.repositories.InventoryRepo;
import com.jameson.backend.repositories.ProductRepo;
import com.jameson.backend.repositories.SalesOrderDetailRepo;
import com.jameson.backend.repositories.SalesOrderRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Polymorphism
@Service
public class SalesOrderServiceImpl implements SalesOrderService {

    private final SalesOrderRepo salesOrderRepo;
    private final SalesOrderDetailRepo salesOrderDetailRepo;
    private final ProductRepo productRepo;
    private final InventoryRepo inventoryRepo;

    public SalesOrderServiceImpl(
            SalesOrderRepo salesOrderRepo,
            SalesOrderDetailRepo salesOrderDetailRepo,
            ProductRepo productRepo,
            InventoryRepo inventoryRepo
    ) {
        this.salesOrderRepo = salesOrderRepo;
        this.salesOrderDetailRepo = salesOrderDetailRepo;
        this.productRepo = productRepo;
        this.inventoryRepo = inventoryRepo;
    }

    @Override
    public List<SalesOrder> findAll() {
        return salesOrderRepo.findAll();
    }

    @Override
    public Optional<SalesOrder> findById(Long id) {
        return salesOrderRepo.findById(id);
    }

    @Override
    public SalesOrder findBySalesOrderDetailId(Long salesOrderDetailId) {
        return salesOrderRepo.findBySalesOrderDetailId(salesOrderDetailId);
    }

    @Override
    public SalesOrder save(SalesOrder salesOrder) {
        return salesOrderRepo.save(salesOrder);
    }

    @Override
    public void delete(Long id) {
        List<SalesOrderDetail> details = salesOrderDetailRepo.findBySalesOrderId(id);
        for (SalesOrderDetail detail : details) {
            Product product = detail.getProduct();
            product.setUnitsInStock(product.getUnitsInStock() + detail.getQuantityOrdered());
            productRepo.save(product);

            Inventory inventory = inventoryRepo.findBySalesOrderDetailId(detail.getId());
            inventoryRepo.delete(inventory);
        }
        salesOrderRepo.deleteById(id);
    }
}
