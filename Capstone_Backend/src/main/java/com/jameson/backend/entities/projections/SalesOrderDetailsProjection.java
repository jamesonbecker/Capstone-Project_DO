package com.jameson.backend.entities.projections;

import com.jameson.backend.entities.Product;
import com.jameson.backend.entities.SalesOrder;
import com.jameson.backend.entities.SalesOrderDetail;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;

@Projection(name = "soDetailsProjection", types = {SalesOrderDetail.class})
public interface SalesOrderDetailsProjection {

    Long getId();
    SalesOrder getSalesOrder();
    Product getProduct();
    int getQuantityOrdered();
    BigDecimal getLineTotal();
    Date getDateCreated();
}
