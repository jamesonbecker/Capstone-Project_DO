package com.jameson.backend.controllers;

import com.jameson.backend.entities.SalesOrder;
import com.jameson.backend.services.SalesOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales-orders")
public class SalesOrderController {

    private final SalesOrderService salesOrderService;

    public SalesOrderController(SalesOrderService salesOrderService) {
        this.salesOrderService = salesOrderService;
    }

    @GetMapping
    public List<SalesOrder> getAllSalesOrders() {
        return salesOrderService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalesOrder> getSalesOrderById(@PathVariable Long id) {
        return salesOrderService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/salesOrderDetails/{salesOrderDetailId}")
    public SalesOrder getSalesOrderBySalesOrderDetailId(@PathVariable Long salesOrderDetailId) {
        return salesOrderService.findBySalesOrderDetailId(salesOrderDetailId);
    }

    @PostMapping
    public SalesOrder createSalesOrder(@RequestBody SalesOrder salesOrder) {
        return salesOrderService.save(salesOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalesOrder(@PathVariable Long id) {
        salesOrderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
