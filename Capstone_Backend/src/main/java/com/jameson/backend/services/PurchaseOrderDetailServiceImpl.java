package com.jameson.backend.services;

import com.jameson.backend.entities.*;
import com.jameson.backend.entities.projections.PurchaseOrderDetailProjection;
import com.jameson.backend.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Polymorphism
@Service
public class PurchaseOrderDetailServiceImpl implements PurchaseOrderDetailService {

    private final PurchaseOrderDetailRepo purchaseOrderDetailRepo;
    private final PurchaseOrderRepo purchaseOrderRepo;
    private final ProductRepo productRepo;
    private final PartRepo partRepo;
    private final InventoryRepo inventoryRepo;

    public PurchaseOrderDetailServiceImpl(
            PurchaseOrderDetailRepo purchaseOrderDetailRepo,
            PurchaseOrderRepo purchaseOrderRepo,
            ProductRepo productRepo,
            PartRepo partRepo,
            InventoryRepo inventoryRepo
    ) {
        this.purchaseOrderDetailRepo = purchaseOrderDetailRepo;
        this.purchaseOrderRepo = purchaseOrderRepo;
        this.productRepo = productRepo;
        this.partRepo = partRepo;
        this.inventoryRepo = inventoryRepo;
    }

    @Override
    public List<PurchaseOrderDetail> findAll() {
        return purchaseOrderDetailRepo.findAll();
    }

    @Override
    public Optional<PurchaseOrderDetail> findById(Long id) {
        return purchaseOrderDetailRepo.findById(id);
    }

    @Override
    public List<PurchaseOrderDetail> findByPurchaseOrderId(Long id) {
        return purchaseOrderDetailRepo.findByPurchaseOrderOrderNumber(id);
    }

    @Override
    public List<PurchaseOrderDetailProjection> findByProductId(Long id) {
        return purchaseOrderDetailRepo.findByProductId(id);
    }

    @Override
    public List<PurchaseOrderDetailProjection> findByPartId(Long id) {
        return purchaseOrderDetailRepo.findByPartId(id);
    }

    @Override
    public PurchaseOrderDetail save(PurchaseOrderDetail purchaseOrderDetail, Long purchaseOrderId) {
        Product existingProduct = new Product();
        Part existingPart = new Part();
        if (purchaseOrderDetail.getProduct() != null) {
            existingProduct = productRepo.findById(purchaseOrderDetail.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            existingProduct.setUnitsInStock(existingProduct.getUnitsInStock() + purchaseOrderDetail.getQuantityOrdered());
            productRepo.save(existingProduct);
        } else if (purchaseOrderDetail.getPart() != null) {
            existingPart = partRepo.findById(purchaseOrderDetail.getPart().getId())
                    .orElseThrow(() -> new RuntimeException("Part not found"));
            existingPart.setUnitsInStock(existingPart.getUnitsInStock() + purchaseOrderDetail.getQuantityOrdered());
            partRepo.save(existingPart);
        }

        Optional<PurchaseOrder> purchaseOrder = purchaseOrderRepo.findById(purchaseOrderId);
        if (purchaseOrder.isPresent()) {
            purchaseOrderDetail.setPurchaseOrder(purchaseOrder.get());
            PurchaseOrderDetail savedPurchaseOrderDetail = purchaseOrderDetailRepo.save(purchaseOrderDetail);
            Inventory inventory = new Inventory();
            if (purchaseOrderDetail.getProduct() != null) {
                inventory.setProduct(existingProduct);
                inventory.setAvailableQuantity(existingProduct.getUnitsInStock());
            } else if (purchaseOrderDetail.getPart() != null) {
                inventory.setPart(existingPart);
                inventory.setAvailableQuantity(existingPart.getUnitsInStock());
            }
            inventory.setPurchaseOrderDetailId(purchaseOrderDetail.getId());
            inventory.setItemSku(existingProduct.getSku());
            inventory.setQuantity(purchaseOrderDetail.getQuantityOrdered());
            inventory.setDate(purchaseOrderDetail.getDateCreated());
            inventory.setAdjustmentType("PO");
            inventory.setOrderNumber(purchaseOrderId);
            inventory.setBillOfMaterialDetailId(null);
            inventory.setSalesOrderDetailId(null);
            inventoryRepo.save(inventory);
            return savedPurchaseOrderDetail;
        } else {
            throw new RuntimeException("Sales Order Not Found");
        }
    }

    @Override
    public PurchaseOrderDetail update(Long purchaseOrderDetailId, Long purchaseOrderId, PurchaseOrderDetail updatedPurchaseOrderDetail) {
        PurchaseOrderDetail purchaseOrderDetail = purchaseOrderDetailRepo.findById(purchaseOrderDetailId)
                .orElseThrow(() -> new RuntimeException("Purchase Order Not Found"));
        PurchaseOrder newPurchaseOrder = purchaseOrderRepo.findById(purchaseOrderId)
                .orElseThrow(() -> new RuntimeException("Purchase Order Not Found"));

        purchaseOrderDetail.setPurchaseOrder(newPurchaseOrder);
        return purchaseOrderDetailRepo.save(purchaseOrderDetail);
    }

    @Override
    public void delete(Long id) {
        purchaseOrderDetailRepo.deleteById(id);
    }
}
