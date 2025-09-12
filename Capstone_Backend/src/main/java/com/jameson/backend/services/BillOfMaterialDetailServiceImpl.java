package com.jameson.backend.services;

import com.jameson.backend.entities.BillOfMaterial;
import com.jameson.backend.entities.BillOfMaterialDetail;
import com.jameson.backend.entities.projections.BillOfMaterialDetailsProjection;
import com.jameson.backend.repositories.BillOfMaterialDetailRepo;
import com.jameson.backend.repositories.BillOfMaterialRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Polymorphism
@Service
public class BillOfMaterialDetailServiceImpl implements BillOfMaterialDetailService {
    private final BillOfMaterialDetailRepo billOfMaterialDetailRepo;
    private final BillOfMaterialRepo billOfMaterialRepo;

    public BillOfMaterialDetailServiceImpl(
            BillOfMaterialDetailRepo billOfMaterialDetailRepo,
            BillOfMaterialRepo billOfMaterialRepo
    ) {
        this.billOfMaterialDetailRepo = billOfMaterialDetailRepo;
        this.billOfMaterialRepo = billOfMaterialRepo;
    }

    @Override
    public List<BillOfMaterialDetail> findAll() {
        return billOfMaterialDetailRepo.findAll();
    }

    @Override
    public Optional<BillOfMaterialDetail> findById(Long id) {
        return billOfMaterialDetailRepo.findById(id);
    }

    @Override
    public List<BillOfMaterialDetail> findByBillOfMaterialId(Long id) {
        return billOfMaterialDetailRepo.findByBillOfMaterialId(id);
    }

    @Override
    public List<BillOfMaterialDetailsProjection> findByPartId(Long id) {
        return billOfMaterialDetailRepo.findByPartId(id);
    }

    @Override
    public BillOfMaterialDetail save(BillOfMaterialDetail billOfMaterialDetail, Long billOfMaterialId) {

        Optional<BillOfMaterial> billOfMaterial = billOfMaterialRepo.findById(billOfMaterialId);
        if (billOfMaterial.isPresent()) {
            billOfMaterialDetail.setBillOfMaterial(billOfMaterial.get());
            BillOfMaterialDetail savedBillOfMaterialDetail = billOfMaterialDetailRepo.save(billOfMaterialDetail);
            return savedBillOfMaterialDetail;
        } else {
            throw new RuntimeException("BillOfMaterial not found");
        }
    }

    @Override
    public BillOfMaterialDetail update(Long detailId, Long billOfMaterialId, BillOfMaterialDetail updatedBillOfMaterialDetail) {
        BillOfMaterialDetail billOfMaterialDetail = billOfMaterialDetailRepo.findById(detailId)
                .orElseThrow(() -> new RuntimeException("Bill Of Material Detail not found"));
        BillOfMaterial newBillOfMaterial = billOfMaterialRepo.findById(billOfMaterialId)
                .orElseThrow(() -> new RuntimeException("Bill Of Material not found"));

        billOfMaterialDetail.setBillOfMaterial(newBillOfMaterial);
        return billOfMaterialDetailRepo.save(billOfMaterialDetail);
    }

    @Override
    public void delete(Long id) {
        billOfMaterialDetailRepo.deleteById(id);
    }
}
