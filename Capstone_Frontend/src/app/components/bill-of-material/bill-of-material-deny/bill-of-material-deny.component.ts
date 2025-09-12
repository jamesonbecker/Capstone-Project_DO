import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillOfMaterials } from 'src/app/common/bill-of-materials';
import { Products } from 'src/app/common/products';
import { BillOfMaterialService } from 'src/app/services/bill-of-material.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-bill-of-material-deny',
  templateUrl: './bill-of-material-deny.component.html',
  styleUrl: '../../../../styles.css',
})
export class BillOfMaterialDenyComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  selectedProduct: Products;
  billOfMaterials: BillOfMaterials;

  constructor(
    private productService: ProductsService,
    private billService: BillOfMaterialService,
    public dialogRef: MatDialogRef<BillOfMaterialDenyComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.data.id);
    this.loadProduct();
    this.loadBillOfMaterials();
  }

  loadProduct() {
    this.productService.getProductById(this.data.id).subscribe((results) => {
      this.selectedProduct = results;
    });
  }

  loadBillOfMaterials() {
    this.billService
      .getBillOfMaterialByProductId(this.data.id)
      .subscribe((results) => {
        this.billOfMaterials = results;
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
