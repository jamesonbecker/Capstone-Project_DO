package com.jameson.backend.services;

import com.jameson.backend.entities.Inventory;
import com.jameson.backend.entities.Product;
import com.jameson.backend.entities.SalesOrder;
import com.jameson.backend.entities.SalesOrderDetail;
import com.jameson.backend.entities.projections.SalesOrderDetailsProjection;
import com.jameson.backend.repositories.InventoryRepo;
import com.jameson.backend.repositories.ProductRepo;
import com.jameson.backend.repositories.SalesOrderDetailRepo;
import com.jameson.backend.repositories.SalesOrderRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Polymorphism
@Service
public class SalesOrderDetailServiceImpl implements SalesOrderDetailService {
    private final SalesOrderDetailRepo salesOrderDetailRepo;
    private final SalesOrderRepo salesOrderRepo;
    private final ProductRepo productRepo;
    private final InventoryRepo inventoryRepo;

    public SalesOrderDetailServiceImpl(
            SalesOrderDetailRepo salesOrderDetailRepo,
            SalesOrderRepo salesOrderRepo,
            ProductRepo productRepo,
            InventoryRepo inventoryRepo
    ) {
        this.salesOrderDetailRepo = salesOrderDetailRepo;
        this.salesOrderRepo = salesOrderRepo;
        this.productRepo = productRepo;
        this.inventoryRepo = inventoryRepo;
    }

    @Override
    public List<SalesOrderDetail> findAll() {
        return salesOrderDetailRepo.findAll();
    }

    @Override
    public Optional<SalesOrderDetail> findById(Long id) {
        return salesOrderDetailRepo.findById(id);
    }

    @Override
    public List<SalesOrderDetail> findBySalesOrderId(Long id) {
        return salesOrderDetailRepo.findBySalesOrderId(id);
    }

    @Override
    public List<SalesOrderDetailsProjection> findByProductId(Long id) {
        return salesOrderDetailRepo.findByProductId(id);
    }

    @Override
    public SalesOrderDetail save(SalesOrderDetail salesOrderDetail, Long salesOrderId) {
        Product existingProduct = productRepo.findById(salesOrderDetail.getProduct().getId()).orElseThrow(() -> new RuntimeException("Product not found"));
        if (existingProduct.getUnitsInStock() < salesOrderDetail.getQuantityOrdered()) {
            throw new RuntimeException("Not enough available quantity for " + existingProduct.getSku());
        }
        existingProduct.setUnitsInStock(existingProduct.getUnitsInStock() - salesOrderDetail.getQuantityOrdered());
        productRepo.save(existingProduct);

        Optional<SalesOrder> salesOrder = salesOrderRepo.findById(salesOrderId);
        if (salesOrder.isPresent()) {
            salesOrderDetail.setSalesOrder(salesOrder.get());
            SalesOrderDetail savedSalesOrderDetail = salesOrderDetailRepo.save(salesOrderDetail);
            Inventory inventory = new Inventory();
            inventory.setProduct(existingProduct);
            inventory.setItemSku(existingProduct.getSku());
            inventory.setSalesOrderDetailId(salesOrderDetail.getId());
            inventory.setQuantity(salesOrderDetail.getQuantityOrdered());
            inventory.setAvailableQuantity(existingProduct.getUnitsInStock());
            inventory.setDate(salesOrderDetail.getDateCreated());
            inventory.setAdjustmentType("SO");
            inventory.setOrderNumber(salesOrderId);
            inventory.setPurchaseOrderDetailId(null);
            inventory.setBillOfMaterialDetailId(null);
            inventoryRepo.save(inventory);
            return savedSalesOrderDetail;
        } else {
            throw new RuntimeException("Sales Order Not Found");
        }
    }

    @Override
    public SalesOrderDetail update(Long detailId, Long salesOrderId, SalesOrderDetail updatedSalesOrderDetail) {

        SalesOrderDetail salesOrderDetail = salesOrderDetailRepo.findById(detailId)
                .orElseThrow(() -> new RuntimeException("Sales Order Detail Not Found"));
        SalesOrder newSalesOrder = salesOrderRepo.findById(salesOrderId)
                .orElseThrow(() -> new RuntimeException("Sales Order Not Found"));

        salesOrderDetail.setSalesOrder(newSalesOrder);
        salesOrderDetail.setProduct(updatedSalesOrderDetail.getProduct());
        salesOrderDetail.setQuantityOrdered(updatedSalesOrderDetail.getQuantityOrdered());
        salesOrderDetail.setLineTotal(updatedSalesOrderDetail.getLineTotal());

        return salesOrderDetailRepo.save(salesOrderDetail);
    }

    @Override
    public void delete(Long id) {
        salesOrderDetailRepo.deleteById(id);
    }
}
