package com.jameson.backend.controllers;

import com.jameson.backend.entities.BillOfMaterialDetail;
import com.jameson.backend.entities.projections.BillOfMaterialDetailsProjection;
import com.jameson.backend.services.BillOfMaterialDetailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bill-of-material-details")
public class BillOfMaterialDetailController {

    private final BillOfMaterialDetailService billOfMaterialDetailService;

    public BillOfMaterialDetailController(BillOfMaterialDetailService billOfMaterialDetailService) {
        this.billOfMaterialDetailService = billOfMaterialDetailService;
    }

    @GetMapping
    public List<BillOfMaterialDetail> getAllBillOfMaterialDetails() {
        return billOfMaterialDetailService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BillOfMaterialDetail> getBillOfMaterialDetailById(@PathVariable Long id) {
        return billOfMaterialDetailService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/billOfMaterials/{billOfMaterialId}")
    public List<BillOfMaterialDetail> getBillOfMaterialDetailsByBillOfMaterialId(@PathVariable Long billOfMaterialId) {
        return billOfMaterialDetailService.findByBillOfMaterialId(billOfMaterialId);
    }

    @GetMapping("/parts/{partId}")
    public List<BillOfMaterialDetailsProjection> getBillOfMaterialDetailsByPartId(@PathVariable Long partId) {
        return billOfMaterialDetailService.findByPartId(partId);
    }

    @PostMapping("/billOfMaterials/{billOfMaterialId}")
    public BillOfMaterialDetail createBillOfMaterialDetail(@RequestBody BillOfMaterialDetail billOfMaterialDetail, @PathVariable Long billOfMaterialId) {
        return billOfMaterialDetailService.save(billOfMaterialDetail, billOfMaterialId);
    }

    @PutMapping("/{billOfMaterialDetailId}/billOfMaterials/{billOfMaterialId}")
    public ResponseEntity<BillOfMaterialDetail> updateBillOfMaterialDetail(@PathVariable Long billOfMaterialDetailId, @PathVariable Long billOfMaterialId, @RequestBody BillOfMaterialDetail billOfMaterialDetail) {
        return ResponseEntity.ok(billOfMaterialDetailService.update(billOfMaterialDetailId, billOfMaterialId, billOfMaterialDetail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBillOfMaterialDetailById(@PathVariable Long id) {
        billOfMaterialDetailService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
