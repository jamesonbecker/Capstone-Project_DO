package com.jameson.backend.dto;

import com.jameson.backend.entities.Inventory;
import com.jameson.backend.entities.PurchaseOrderDetail;
import com.jameson.backend.repositories.PartRepo;
import com.jameson.backend.repositories.ProductRepo;
import org.springframework.stereotype.Component;

@Component
public class Mapper {
    private final ProductRepo productRepo;
    private final PartRepo partRepo;

    public Mapper(ProductRepo productRepo, PartRepo partRepo) {
        this.productRepo = productRepo;
        this.partRepo = partRepo;
    }

    public InventoryDto inventoryToDto(Inventory inventory) {
        InventoryDto dto = new InventoryDto();
        dto.setId(inventory.getId());
        dto.setAdjustmentType(inventory.getAdjustmentType());
        dto.setItemSku(inventory.getItemSku());
        dto.setOrderNumber(inventory.getOrderNumber());
        if (inventory.getProduct() != null) {
            dto.setProductId(inventory.getProduct().getId());
            dto.setProductSku(inventory.getProduct().getSku());
        }
        if (inventory.getPart() != null) {
            dto.setPartId(inventory.getPart().getId());
            dto.setPartSku(inventory.getPart().getSku());
        }
        dto.setQuantity(inventory.getQuantity());
        dto.setAvailableQuantity(inventory.getAvailableQuantity());
        dto.setDate(inventory.getDate());
        dto.setBillOfMaterialId(inventory.getBillOfMaterialId());
        dto.setBillOfMaterialDetailId(inventory.getBillOfMaterialDetailId());
        dto.setSalesOrderDetailId(inventory.getSalesOrderDetailId());
        dto.setPurchaseOrderDetailId(inventory.getPurchaseOrderDetailId());
        return dto;
    }

    public PurchaseOrderDetailDto purchaseOrderToDto(PurchaseOrderDetail purchaseOrderDetail) {
        PurchaseOrderDetailDto dto = new PurchaseOrderDetailDto();
        dto.setId(purchaseOrderDetail.getId());
        if (purchaseOrderDetail.getProduct() != null) {
            dto.setProductId(purchaseOrderDetail.getProduct().getId());
            dto.setProductSku(purchaseOrderDetail.getProduct().getSku());
        }
        if (purchaseOrderDetail.getPart() != null) {
            dto.setPartId(purchaseOrderDetail.getPart().getId());
            dto.setPartSku(purchaseOrderDetail.getPart().getSku());
        }
        dto.setQuantityOrdered(purchaseOrderDetail.getQuantityOrdered());
        dto.setLineTotal(purchaseOrderDetail.getLineTotal());
        dto.setDateCreated(purchaseOrderDetail.getDateCreated());
        return dto;
    }

    public Inventory inventoryFromDto(InventoryDto dto) {
        Inventory inventory = new Inventory();
        inventory.setId(dto.getId());
        inventory.setAdjustmentType(dto.getAdjustmentType());
        inventory.setItemSku(dto.getItemSku());
        inventory.setOrderNumber(dto.getOrderNumber());
        if (dto.getProductId() != null) {
            inventory.setProduct(productRepo.findById(dto.getProductId()).orElseThrow(() -> new RuntimeException("Product not found")));
        }
        if (dto.getPartId() != null) {
            inventory.setPart(partRepo.findById(dto.getPartId()).orElseThrow(() -> new RuntimeException("Part not found")));
        }
        inventory.setQuantity(dto.getQuantity());
        inventory.setAvailableQuantity(dto.getAvailableQuantity());
        inventory.setDate(dto.getDate());
        inventory.setBillOfMaterialId(dto.getBillOfMaterialId());
        inventory.setBillOfMaterialDetailId(dto.getBillOfMaterialDetailId());
        inventory.setSalesOrderDetailId(dto.getSalesOrderDetailId());
        inventory.setPurchaseOrderDetailId(dto.getPurchaseOrderDetailId());
        return inventory;
    }
}
