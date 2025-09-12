package com.jameson.backend.repositories;

import com.jameson.backend.entities.SalesOrderDetail;
import com.jameson.backend.entities.projections.SalesOrderDetailsProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "salesOrderDetails", path = "sales-order-details")
public interface SalesOrderDetailRepo extends JpaRepository<SalesOrderDetail, Long> {

    List<SalesOrderDetail> findBySalesOrderId(@Param("salesOrderId") Long salesOrderId);

    List<SalesOrderDetailsProjection> findByProductId(@Param("productId") Long productId);
}