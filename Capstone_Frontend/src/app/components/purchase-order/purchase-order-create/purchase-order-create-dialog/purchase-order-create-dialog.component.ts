import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order-create-dialog',
  templateUrl: './purchase-order-create-dialog.component.html',
  styleUrl: '../../../../../styles.css',
})
export class PurchaseOrderCreateDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<PurchaseOrderCreateDialogComponent>,
    private router: Router
  ) {}

  onProduct(): void {
    this.router.navigate(['/purchase-orders/productsCreate']);
    this.dialogRef.close();
  }

  onPart(): void {
    this.router.navigate(['/purchase-orders/partsCreate']);
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
