package com.jameson.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class InventoryDto {

    private Long id;
    private Long productId;
    private String productSku;
    private Long partId;
    private String partSku;
    private Long billOfMaterialId;
    private Long billOfMaterialDetailId;
    private Long salesOrderDetailId;
    private Long purchaseOrderDetailId;
    private String adjustmentType;
    private Long orderNumber;
    private String itemSku;
    private int quantity;
    private int availableQuantity;
    private Date date;
}
