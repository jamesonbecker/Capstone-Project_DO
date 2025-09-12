import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-order-delete-dialog',
  templateUrl: './purchase-order-delete-dialog.component.html',
  styleUrl: './purchase-order-delete-dialog.component.scss',
})
export class PurchaseOrderDeleteDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  orderId = this.data.orderId;

  constructor(private dialogRef: MatDialogRef<PurchaseOrderDeleteDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close(1);
  }
}
