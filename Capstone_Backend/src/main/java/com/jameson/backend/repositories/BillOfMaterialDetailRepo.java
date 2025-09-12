package com.jameson.backend.repositories;

import com.jameson.backend.entities.BillOfMaterialDetail;
import com.jameson.backend.entities.projections.BillOfMaterialDetailsProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "billOfMaterialDetails", path = "bill-of-material-details")
public interface BillOfMaterialDetailRepo extends JpaRepository<BillOfMaterialDetail, Long> {

    List<BillOfMaterialDetail> findByBillOfMaterialId(@Param("billOfMaterialId") Long billOfMaterialId);

    List<BillOfMaterialDetailsProjection> findByPartId(@Param("partId") Long partId);
}
