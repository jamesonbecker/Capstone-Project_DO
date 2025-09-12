package com.jameson.backend.services;

import com.jameson.backend.entities.*;
import com.jameson.backend.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Polymorphism
@Service
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    private final PurchaseOrderRepo purchaseOrderRepo;
    private final PurchaseOrderDetailRepo purchaseOrderDetailRepo;
    private final ProductRepo productRepo;
    private final PartRepo partRepo;
    private final InventoryRepo inventoryRepo;

    public PurchaseOrderServiceImpl(
            PurchaseOrderRepo purchaseOrderRepo,
            PurchaseOrderDetailRepo purchaseOrderDetailRepo,
            ProductRepo productRepo,
            PartRepo partRepo,
            InventoryRepo inventoryRepo
    ) {
        this.purchaseOrderRepo = purchaseOrderRepo;
        this.purchaseOrderDetailRepo = purchaseOrderDetailRepo;
        this.productRepo = productRepo;
        this.partRepo = partRepo;
        this.inventoryRepo = inventoryRepo;
    }

    @Override
    public List<PurchaseOrder> findAll() {
        return purchaseOrderRepo.findAll();
    }

    @Override
    public Optional<PurchaseOrder> findById(Long id) {
        return purchaseOrderRepo.findById(id);
    }

    @Override
    public PurchaseOrder findByPurchaseOrderDetailId(Long id) {
        return purchaseOrderRepo.findByPurchaseOrderDetailId(id);
    }

    @Override
    public PurchaseOrder save(PurchaseOrder purchaseOrder) {
        return purchaseOrderRepo.save(purchaseOrder);
    }

    @Override
    public void delete(Long id) {
        List<PurchaseOrderDetail> details = purchaseOrderDetailRepo.findByPurchaseOrderOrderNumber(id);
        for (PurchaseOrderDetail detail : details) {
            if (detail.getProduct() != null) {
                Product product = detail.getProduct();
                product.setUnitsInStock(product.getUnitsInStock() - detail.getQuantityOrdered());
                productRepo.save(product);

                Inventory inventory = inventoryRepo.findByPurchaseOrderDetailId(detail.getId());
                inventoryRepo.delete(inventory);
            } else if (detail.getPart() != null) {
                Part part = detail.getPart();
                part.setUnitsInStock(part.getUnitsInStock() - detail.getQuantityOrdered());
                partRepo.save(part);

                Inventory inventory = inventoryRepo.findByPurchaseOrderDetailId(detail.getId());
                inventoryRepo.delete(inventory);
            }
        }
        purchaseOrderRepo.deleteById(id);
    }
}
