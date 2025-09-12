package com.jameson.backend.services;

import com.jameson.backend.entities.PurchaseOrderDetail;
import com.jameson.backend.entities.projections.PurchaseOrderDetailProjection;

import java.util.List;
import java.util.Optional;

// Polymorphism
public interface PurchaseOrderDetailService {

    List<PurchaseOrderDetail> findAll();
    Optional<PurchaseOrderDetail> findById(Long id);
    List<PurchaseOrderDetail> findByPurchaseOrderId(Long id);
    List<PurchaseOrderDetailProjection> findByProductId(Long id);
    List<PurchaseOrderDetailProjection> findByPartId(Long id);
    PurchaseOrderDetail save(PurchaseOrderDetail purchaseOrderDetail, Long purchaseOrderId);
    PurchaseOrderDetail update(Long purchaseOrderDetailId, Long purchaseOrderId, PurchaseOrderDetail purchaseOrderDetail);
    void delete(Long purchaseOrderDetailId);
}
