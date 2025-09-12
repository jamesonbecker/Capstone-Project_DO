package com.jameson.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JoinColumn(name = "part_id")
    @JsonIgnore
    private Part part;

    @Column(name = "bill_of_material_id")
    private Long billOfMaterialId;

    @Column(name = "bill_of_material_detail_id")
    private Long billOfMaterialDetailId;

    @Column(name = "sales_order_detail_id")
    private Long salesOrderDetailId;

    @Column(name = "purchase_order_detail_id")
    private Long purchaseOrderDetailId;

    @Column(name = "item_sku")
    private String itemSku;

    @Column(name = "adjustment_type")
    private String adjustmentType;

    @Column(name = "order_number")
    private Long orderNumber;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "available_quantity")
    private int availableQuantity;

    @Column(name = "date")
    private Date date;
}
