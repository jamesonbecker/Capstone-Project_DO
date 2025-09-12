package com.jameson.backend.services;

import com.jameson.backend.entities.SalesOrderDetail;
import com.jameson.backend.entities.projections.SalesOrderDetailsProjection;

import java.util.List;
import java.util.Optional;

// Polymorphism
public interface SalesOrderDetailService {

    List<SalesOrderDetail> findAll();
    Optional<SalesOrderDetail> findById(Long id);
    List<SalesOrderDetail> findBySalesOrderId(Long salesOrderId);
    List<SalesOrderDetailsProjection> findByProductId(Long productId);
    SalesOrderDetail save(SalesOrderDetail salesOrderDetail, Long salesOrderId);
    SalesOrderDetail update(Long detailId, Long salesOrderId, SalesOrderDetail salesOrderDetail);
    void delete(Long id);
}
