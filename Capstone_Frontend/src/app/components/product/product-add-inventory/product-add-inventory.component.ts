import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillOfMaterials } from 'src/app/common/bill-of-materials';
import { Products } from 'src/app/common/products';
import { BillOfMaterialService } from 'src/app/services/bill-of-material.service';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-bom-dialog',
  templateUrl: './product-add-inventory.component.html',
  styleUrl: '../../../../styles.css',
})
export class ProductAddInventoryComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  selectedProduct: Products;
  selectedBillOfMaterials: BillOfMaterials;
  billId!: number;

  quantityFormControl = new FormControl('');

  constructor(
    private productService: ProductsService,
    private billService: BillOfMaterialService,
    public dialogRef: MatDialogRef<ProductAddInventoryComponent>
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.loadBillOfMaterials();
  }

  loadProduct() {
    this.productService
      .getProductById(this.data.id)
      .subscribe((productResults) => {
        this.selectedProduct = productResults;
      });
  }

  loadBillOfMaterials() {
    this.billService
      .getBillOfMaterialByProductId(this.data.id)
      .subscribe((billResults) => {
        this.selectedBillOfMaterials = billResults;
      });
  }

  onSubmit(): void {
    const inventoryQuantity = +this.quantityFormControl.value;
    this.selectedProduct.unitsInStock =
      this.selectedProduct.unitsInStock + inventoryQuantity;
    this.productService
      .addProductInventory(
        this.selectedProduct.id,
        this.selectedBillOfMaterials.id,
        this.selectedProduct
      )
      .subscribe((results) => {
        console.log('success');
      });

    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
