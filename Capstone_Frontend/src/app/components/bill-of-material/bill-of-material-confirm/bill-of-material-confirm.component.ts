import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Products } from 'src/app/common/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-bill-of-material-confirm',
  templateUrl: './bill-of-material-confirm.component.html',
  styleUrl: '../../../../styles.css',
})
export class BillOfMaterialConfirmComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  selectedProduct: Products;

  constructor(
    private productService: ProductsService,
    public dialogRef: MatDialogRef<BillOfMaterialConfirmComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.data.id);
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProductById(this.data.id).subscribe((results) => {
      this.selectedProduct = results;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
    if (this.data.close == 1) {
      this.productService.deleteProduct(this.data.id).subscribe((results) => {
        console.log('success');
      });
    }
  }

  onCreate(): void {
    this.router.navigate(['/bill-of-materials/products', this.data.id]);
    this.dialogRef.close();
  }
}
