package com.jameson.backend.services;

import com.jameson.backend.entities.*;
import com.jameson.backend.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Polymorphism
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final ProductCategoryRepo productCategoryRepo;
    private final BillOfMaterialRepo billOfMaterialRepo;
    private final PartRepo partRepo;
    private final BillOfMaterialDetailRepo billOfMaterialDetailRepo;
    private final InventoryRepo inventoryRepo;

    public ProductServiceImpl(
            ProductRepo productRepo,
            ProductCategoryRepo productCategoryRepo,
            BillOfMaterialRepo billOfMaterialRepo,
            PartRepo partRepo,
            BillOfMaterialDetailRepo billOfMaterialDetailRepo,
            InventoryRepo inventoryRepo
    ) {
        this.productRepo = productRepo;
        this.productCategoryRepo = productCategoryRepo;
        this.billOfMaterialRepo = billOfMaterialRepo;
        this.partRepo = partRepo;
        this.billOfMaterialDetailRepo = billOfMaterialDetailRepo;
        this.inventoryRepo = inventoryRepo;
    }

    @Override
    public List<Product> findAll() {
        return productRepo.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepo.findById(id);
    }

    @Override
    public Product save(Product product, Long productCategoryId) {
        Optional<ProductCategory> productCategory = productCategoryRepo.findById(productCategoryId);
        if (productCategory.isPresent()) {
            product.setCategory(productCategory.get());
            return productRepo.save(product);
        } else {
            throw new RuntimeException("Product category not found");
        }
    }

    @Override
    public Product updateProductCategory(Long productId, Long productCategoryId, Product updatedProduct) {

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        ProductCategory newProductCategory = productCategoryRepo.findById(productCategoryId)
                .orElseThrow(() -> new RuntimeException("Product category not found"));

        product.setCategory(newProductCategory);
        product.setSku(updatedProduct.getSku());
        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setActive(updatedProduct.isActive());
        product.setKit(updatedProduct.isKit());
        product.setLocation(updatedProduct.getLocation());

        return productRepo.save(product);
    }

    @Override
    public Product addInventory(Long productId, Long billId, Product updatedProduct) {
        Product existingProduct = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        BillOfMaterial billOfMaterial = billOfMaterialRepo.findById(billId)
                .orElseThrow(() -> new RuntimeException("Bill of Material not found"));
        List<BillOfMaterialDetail> billOfMaterialDetails = billOfMaterialDetailRepo.findByBillOfMaterialId(billOfMaterial.getId());

        int addedInventory = updatedProduct.getUnitsInStock() - existingProduct.getUnitsInStock();
        for (BillOfMaterialDetail billOfMaterialDetail : billOfMaterialDetails) {
            Part part = billOfMaterialDetail.getPart();
            Inventory inventory = new Inventory();
            if (part.getUnitsInStock() < (billOfMaterialDetail.getQuantityNeeded() * addedInventory)) {
                throw new RuntimeException("Insufficient stock for part " + part.getSku());
            } else {
                part.setUnitsInStock(part.getUnitsInStock() - (billOfMaterialDetail.getQuantityNeeded() * addedInventory));
                partRepo.save(part);
                inventory.setPart(part);
                inventory.setItemSku(part.getSku());
                inventory.setBillOfMaterialDetailId(billOfMaterialDetail.getId());
                inventory.setQuantity(billOfMaterialDetail.getQuantityNeeded() * addedInventory);
                inventory.setAvailableQuantity(part.getUnitsInStock());
                inventory.setDate(billOfMaterialDetail.getDateCreated());
                inventory.setAdjustmentType("BM");
                inventory.setOrderNumber(billId);
                inventory.setSalesOrderDetailId(null);
                inventory.setPurchaseOrderDetailId(null);
                inventoryRepo.save(inventory);
            }
        }

        Inventory inventory = new Inventory();
        inventory.setProduct(existingProduct);
        inventory.setItemSku(existingProduct.getSku());
        inventory.setBillOfMaterialId(billId);
        inventory.setQuantity(addedInventory);
        inventory.setAvailableQuantity(updatedProduct.getUnitsInStock());
        inventory.setDate(billOfMaterialDetails.get(0).getDateCreated());
        inventory.setAdjustmentType("BM");
        inventory.setOrderNumber(billId);
        inventory.setSalesOrderDetailId(null);
        inventory.setPurchaseOrderDetailId(null);
        inventory.setBillOfMaterialDetailId(null);
        inventoryRepo.save(inventory);

        existingProduct.setUnitsInStock(updatedProduct.getUnitsInStock());
        return productRepo.save(existingProduct);
    }

    @Override
    public void delete(Long id) {
        productRepo.deleteById(id);
    }
}
