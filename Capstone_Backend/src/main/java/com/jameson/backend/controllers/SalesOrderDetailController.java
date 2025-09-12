package com.jameson.backend.controllers;

import com.jameson.backend.entities.SalesOrderDetail;
import com.jameson.backend.entities.projections.SalesOrderDetailsProjection;
import com.jameson.backend.services.SalesOrderDetailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales-order-details")
public class SalesOrderDetailController {

    private final SalesOrderDetailService salesOrderDetailService;

    public SalesOrderDetailController(SalesOrderDetailService salesOrderDetailService) {
        this.salesOrderDetailService = salesOrderDetailService;
    }

    @GetMapping
    public List<SalesOrderDetail> getAllSalesOrderDetails() {
        return salesOrderDetailService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalesOrderDetail> getSalesOrderDetailById(@PathVariable Long id) {
        return salesOrderDetailService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/salesOrders/{salesOrderId}")
    public List<SalesOrderDetail> getSalesOrderDetailBySalesOrderId(@PathVariable Long salesOrderId) {
        return salesOrderDetailService.findBySalesOrderId(salesOrderId);
    }

    @GetMapping("/products/{productId}")
    public List<SalesOrderDetailsProjection> getSalesOrderDetailByProductId(@PathVariable Long productId) {
        return salesOrderDetailService.findByProductId(productId);
    }

    @PostMapping("/salesOrders/{salesOrderId}")
    public SalesOrderDetail createSalesOrderDetail(@RequestBody SalesOrderDetail salesOrderDetail, @PathVariable Long salesOrderId) {
        return salesOrderDetailService.save(salesOrderDetail, salesOrderId);
    }

    @PutMapping("/{salesOrderDetailId}/salesOrders/{salesOrderId}")
    public ResponseEntity<SalesOrderDetail> updateSalesOrderDetail(@PathVariable Long salesOrderDetailId, @PathVariable Long salesOrderId, @RequestBody SalesOrderDetail salesOrderDetail) {
        return ResponseEntity.ok(salesOrderDetailService.update(salesOrderDetailId, salesOrderId, salesOrderDetail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalesOrderDetail(@PathVariable Long id) {
        salesOrderDetailService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
