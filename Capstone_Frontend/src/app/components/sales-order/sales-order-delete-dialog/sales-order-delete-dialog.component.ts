import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sales-order-delete-dialog',
  templateUrl: './sales-order-delete-dialog.component.html',
  styleUrl: './sales-order-delete-dialog.component.scss',
})
export class SalesOrderDeleteDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  orderId = this.data.orderId;

  constructor(
    private dialogRef: MatDialogRef<SalesOrderDeleteDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close(1);
  }
}
