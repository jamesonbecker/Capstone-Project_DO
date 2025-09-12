package com.jameson.backend.services;

import com.jameson.backend.entities.SalesOrder;

import java.util.List;
import java.util.Optional;

// Polymorphism
public interface SalesOrderService {

    List<SalesOrder> findAll();
    Optional<SalesOrder> findById(Long id);
    SalesOrder findBySalesOrderDetailId(Long salesOrderDetailId);
    SalesOrder save(SalesOrder salesOrder);
    void delete(Long id);
}
