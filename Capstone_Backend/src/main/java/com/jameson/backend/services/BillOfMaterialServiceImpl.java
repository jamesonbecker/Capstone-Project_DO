package com.jameson.backend.services;

import com.jameson.backend.entities.*;
import com.jameson.backend.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Polymorphism
@Service
public class BillOfMaterialServiceImpl implements BillOfMaterialService {

    private final BillOfMaterialRepo billOfMaterialRepo;
    private final BillOfMaterialDetailRepo billOfMaterialDetailRepo;
    private final ProductRepo productRepo;
    private final PartRepo partRepo;
    private final InventoryRepo inventoryRepo;

    public BillOfMaterialServiceImpl(
            BillOfMaterialRepo billOfMaterialRepo,
            BillOfMaterialDetailRepo billOfMaterialDetailRepo,
            ProductRepo productRepo,
            PartRepo partRepo,
            InventoryRepo inventoryRepo
    ) {
        this.billOfMaterialRepo = billOfMaterialRepo;
        this.billOfMaterialDetailRepo = billOfMaterialDetailRepo;
        this.productRepo = productRepo;
        this.partRepo = partRepo;
        this.inventoryRepo = inventoryRepo;
    }

    @Override
    public List<BillOfMaterial> findAll() {
        return billOfMaterialRepo.findAll();
    }

    @Override
    public Optional<BillOfMaterial> findById(Long id) {
        return billOfMaterialRepo.findById(id);
    }

    @Override
    public BillOfMaterial findByProductId(Long productId) {
        return billOfMaterialRepo.findBillOfMaterialByProductId(productId);
    }

    @Override
    public BillOfMaterial save(BillOfMaterial billOfMaterial, Long productId){
        Optional<Product> product = productRepo.findById(productId);
        if (product.isPresent()) {
            billOfMaterial.setProduct(product.get());
            return billOfMaterialRepo.save(billOfMaterial);
        } else {
            throw new RuntimeException("Product not found");
        }
    }

    @Override
    public BillOfMaterial updateBillOfMaterialProduct(Long billOfMaterialId, Long productId, BillOfMaterial updatedBillOfMaterial) {
        BillOfMaterial billOfMaterial = billOfMaterialRepo.findById(billOfMaterialId)
                .orElseThrow(() -> new RuntimeException("BillOfMaterial not found"));
        Product newProduct = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        billOfMaterial.setProduct(newProduct);

        return billOfMaterialRepo.save(billOfMaterial);
    }

    @Override
    public void delete(Long id) {
        billOfMaterialRepo.deleteById(id);
    }
}
