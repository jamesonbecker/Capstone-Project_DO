package com.jameson.backend.services;

import com.jameson.backend.entities.BillOfMaterial;

import java.util.List;
import java.util.Optional;

// Polymorphism
public interface BillOfMaterialService {

    List<BillOfMaterial> findAll();
    Optional<BillOfMaterial> findById(Long id);
    BillOfMaterial findByProductId(Long productId);
    BillOfMaterial save(BillOfMaterial billOfMaterial, Long productId);
    BillOfMaterial updateBillOfMaterialProduct(Long billOfMaterialId, Long productId, BillOfMaterial billOfMaterial);
    void delete(Long id);
}
