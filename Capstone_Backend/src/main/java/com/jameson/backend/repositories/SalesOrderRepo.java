package com.jameson.backend.repositories;

import com.jameson.backend.entities.SalesOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "salesOrders", path = "sales-orders")
public interface SalesOrderRepo extends JpaRepository<SalesOrder, Long> {

    SalesOrder findBySalesOrderDetailId(@Param("salesOrderDetailId") Long salesOrderDetailsId);
    
}