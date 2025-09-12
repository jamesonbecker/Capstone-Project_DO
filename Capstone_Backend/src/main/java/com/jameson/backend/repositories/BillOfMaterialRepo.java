package com.jameson.backend.repositories;

import com.jameson.backend.entities.BillOfMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "billOfMaterials", path = "bill-of-materials")
public interface BillOfMaterialRepo extends JpaRepository<BillOfMaterial, Long> {

    BillOfMaterial findBillOfMaterialByProductId(@Param("productId") Long productId);
}
