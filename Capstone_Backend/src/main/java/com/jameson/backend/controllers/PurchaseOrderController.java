package com.jameson.backend.controllers;

import com.jameson.backend.entities.PurchaseOrder;
import com.jameson.backend.services.PurchaseOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase-orders")
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;

    public PurchaseOrderController(PurchaseOrderService purchaseOrderService) {
        this.purchaseOrderService = purchaseOrderService;
    }

    @GetMapping
    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrder> getPurchaseOrderById(@PathVariable Long id) {
        return purchaseOrderService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/purchaseOrderDetails/{purchaseOrderDetailsId}")
    public PurchaseOrder getPurchaseOrderByPurchaseOrderDetailsId(@PathVariable Long purchaseOrderDetailsId) {
        return purchaseOrderService.findByPurchaseOrderDetailId(purchaseOrderDetailsId);
    }

    @PostMapping
    public PurchaseOrder createPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
        return purchaseOrderService.save(purchaseOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchaseOrderById(@PathVariable Long id) {
        purchaseOrderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
