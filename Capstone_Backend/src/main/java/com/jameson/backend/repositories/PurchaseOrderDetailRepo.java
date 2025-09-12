package com.jameson.backend.repositories;

import com.jameson.backend.entities.PurchaseOrderDetail;
import com.jameson.backend.entities.projections.PurchaseOrderDetailProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "purchaseOrderDetails", path = "purchase-order-details")
public interface PurchaseOrderDetailRepo extends JpaRepository<PurchaseOrderDetail, Long> {

    List<PurchaseOrderDetail> findByPurchaseOrderOrderNumber(@Param("purchaseOrderId") Long purchaseOrderId);

    List<PurchaseOrderDetailProjection> findByProductId(@Param("productId") Long productId);

    List<PurchaseOrderDetailProjection> findByPartId(@Param("partId") Long partId);
}
