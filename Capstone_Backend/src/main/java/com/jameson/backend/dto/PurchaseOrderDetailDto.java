package com.jameson.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class PurchaseOrderDetailDto {

    private Long id;
    private Long productId;
    private String productSku;
    private Long partId;
    private String partSku;
    private int quantityOrdered;
    private BigDecimal lineTotal;
    private Date dateCreated;
    private Date lastUpdated;
}
