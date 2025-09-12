package com.jameson.backend.entities.projections;

import com.jameson.backend.entities.Part;
import com.jameson.backend.entities.Product;
import com.jameson.backend.entities.PurchaseOrderDetail;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;

@Projection(name = "poDetailProjection", types = {PurchaseOrderDetail.class})
public interface PurchaseOrderDetailProjection {

    Long getId();
    Product getProduct();
    Part getPart();
    int getQuantityOrdered();
    BigDecimal getLineTotal();
    Date getDateCreated();
    Date getLastUpdated();
}
