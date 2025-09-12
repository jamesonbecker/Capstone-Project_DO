package com.jameson.backend.entities.projections;

import com.jameson.backend.entities.BillOfMaterial;
import com.jameson.backend.entities.Part;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "bmDetailsProjection", types = {BillOfMaterial.class})
public interface BillOfMaterialDetailsProjection {

    Long getId();
    Part getPart();
}
