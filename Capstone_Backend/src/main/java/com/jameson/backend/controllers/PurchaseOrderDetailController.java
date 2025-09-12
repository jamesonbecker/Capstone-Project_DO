package com.jameson.backend.controllers;

import com.jameson.backend.dto.Mapper;
import com.jameson.backend.dto.PurchaseOrderDetailDto;
import com.jameson.backend.entities.PurchaseOrderDetail;
import com.jameson.backend.entities.projections.PurchaseOrderDetailProjection;
import com.jameson.backend.services.PurchaseOrderDetailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api/purchase-order-details")
public class PurchaseOrderDetailController {

    private final PurchaseOrderDetailService purchaseOrderDetailService;
    private final Mapper mapper;

    public PurchaseOrderDetailController(PurchaseOrderDetailService purchaseOrderDetailService, Mapper mapper) {
        this.purchaseOrderDetailService = purchaseOrderDetailService;
        this.mapper = mapper;
    }

    @GetMapping
    public List<PurchaseOrderDetail> getAllPurchaseOrderDetails() {
        return purchaseOrderDetailService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrderDetail> getPurchaseOrderDetailById(@PathVariable Long id) {
        return purchaseOrderDetailService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/purchaseOrders/{purchaseOrderId}")
    public List<PurchaseOrderDetailDto> getPurchaseOrderDetailsByPurchaseOrderId(@PathVariable Long purchaseOrderId) {
        return purchaseOrderDetailService.findByPurchaseOrderId(purchaseOrderId)
                .stream()
                .map(mapper::purchaseOrderToDto)
                .collect(toList());
    }

    @GetMapping("/products/{productId}")
    public List<PurchaseOrderDetailProjection> getPurchaseOrderDetailsByProductId(@PathVariable Long productId) {
        return purchaseOrderDetailService.findByProductId(productId);
    }

    @GetMapping("/parts/{partId}")
    public List<PurchaseOrderDetailProjection> getPurchaseOrderDetailsByPartId(@PathVariable Long partId) {
        return purchaseOrderDetailService.findByPartId(partId);
    }

    @PostMapping("/purchaseOrders/{purchaseOrderId}")
    public PurchaseOrderDetail createPurchaseOrderDetail(@PathVariable Long purchaseOrderId, @RequestBody PurchaseOrderDetail purchaseOrderDetail) {
        return purchaseOrderDetailService.save(purchaseOrderDetail, purchaseOrderId);
    }

    @PutMapping("/{purchaseOrderDetailId}/purchaseOrders/{purchaseOrderId}")
    public ResponseEntity<PurchaseOrderDetail> updatePurchaseOrderDetail(@PathVariable Long purchaseOrderDetailId, @PathVariable Long purchaseOrderId, @RequestBody PurchaseOrderDetail purchaseOrderDetail) {
        return ResponseEntity.ok(purchaseOrderDetailService.update(purchaseOrderDetailId, purchaseOrderId, purchaseOrderDetail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchaseOrderDetail(@PathVariable Long id) {
        purchaseOrderDetailService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
