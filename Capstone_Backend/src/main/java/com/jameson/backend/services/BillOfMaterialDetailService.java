package com.jameson.backend.services;

import com.jameson.backend.entities.BillOfMaterialDetail;
import com.jameson.backend.entities.projections.BillOfMaterialDetailsProjection;

import java.util.List;
import java.util.Optional;

// Polymorphism
public interface BillOfMaterialDetailService {

    List<BillOfMaterialDetail> findAll();
    Optional<BillOfMaterialDetail> findById(Long id);
    List<BillOfMaterialDetail> findByBillOfMaterialId(Long billOfMaterialId);
    List<BillOfMaterialDetailsProjection> findByPartId(Long id);
    BillOfMaterialDetail save(BillOfMaterialDetail billOfMaterialDetail, Long billOfMaterialId);
    BillOfMaterialDetail update(Long detailId, Long billOfMaterialId, BillOfMaterialDetail billOfMaterialDetail);
    void delete(Long id);
}
