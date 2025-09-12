import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrl: './product-delete-dialog.component.scss'
})
export class ProductDeleteDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  sku = this.data.sku;

  constructor(
    private dialogRef: MatDialogRef<ProductDeleteDialogComponent>,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close(1);
  }
}
