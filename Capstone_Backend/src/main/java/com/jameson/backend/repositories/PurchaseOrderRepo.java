package com.jameson.backend.repositories;

import com.jameson.backend.entities.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "purchaseOrders", path = "purchase-orders")
public interface PurchaseOrderRepo extends JpaRepository<PurchaseOrder, Long> {

    PurchaseOrder findByPurchaseOrderDetailId(@Param("purchaseOrderDetailId") Long purchaseOrderDetailsId);
}
