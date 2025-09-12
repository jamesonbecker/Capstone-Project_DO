package com.jameson.backend.services;

import com.jameson.backend.entities.PurchaseOrder;

import java.util.List;
import java.util.Optional;

// Polymorphism
public interface PurchaseOrderService {

    List<PurchaseOrder> findAll();
    Optional<PurchaseOrder> findById(Long id);
    PurchaseOrder findByPurchaseOrderDetailId(Long id);
    PurchaseOrder save(PurchaseOrder purchaseOrder);
    void delete(Long id);
}
