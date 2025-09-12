package com.jameson.backend.controllers;

import com.jameson.backend.entities.BillOfMaterial;
import com.jameson.backend.services.BillOfMaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bill-of-materials")
public class BillOfMaterialController {

    private final BillOfMaterialService billOfMaterialService;

    public BillOfMaterialController(BillOfMaterialService billOfMaterialService) {
        this.billOfMaterialService = billOfMaterialService;
    }

    @GetMapping
    public List<BillOfMaterial> getAllBillOfMaterials() {
        return billOfMaterialService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BillOfMaterial> getBillOfMaterialById(@PathVariable Long id) {
        return billOfMaterialService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/products/{productId}")
    public BillOfMaterial getBillOfMaterialByProductId(@PathVariable Long productId) {
        return billOfMaterialService.findByProductId(productId);
    }

    @PostMapping("/products/{productId}")
    public BillOfMaterial createBillOfMaterial(@RequestBody BillOfMaterial billOfMaterial, @PathVariable Long productId) {
        return billOfMaterialService.save(billOfMaterial, productId);
    }

    @PutMapping("/{billOfMaterialId}/products/{productId}")
    public ResponseEntity<BillOfMaterial> updateBillOfMaterial(@PathVariable Long billOfMaterialId, @PathVariable Long productId, @RequestBody BillOfMaterial billOfMaterial) {
        return ResponseEntity.ok(billOfMaterialService.updateBillOfMaterialProduct(billOfMaterialId, productId, billOfMaterial));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBillOfMaterial(@PathVariable Long id) {
        billOfMaterialService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
