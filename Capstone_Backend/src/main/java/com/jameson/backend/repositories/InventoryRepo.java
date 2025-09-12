package com.jameson.backend.repositories;

import com.jameson.backend.entities.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InventoryRepo extends JpaRepository<Inventory, Long> {

    List<Inventory> findByProductId(Long productId);

    Inventory findBySalesOrderDetailId(Long id);
    Inventory findByPurchaseOrderDetailId(Long id);
    Inventory findByBillOfMaterialDetailId(Long id);

    Inventory findByBillOfMaterialId(Long id);

    @Query(value = "SELECT *, SUM(quantity) as TotalOrdered " +
            "FROM inventory " +
            "WHERE adjustment_type = 'SO'" +
            "GROUP BY id " +
            "ORDER BY TotalOrdered DESC " +
            "LIMIT :limit"
            , nativeQuery = true)
    List<Inventory> getTopFive(@Param("limit") int limit);
}
