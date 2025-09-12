import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bill-of-material-delete-dialog',
  templateUrl: './bill-of-material-delete-dialog.component.html',
  styleUrl: './bill-of-material-delete-dialog.component.scss',
})
export class BillOfMaterialDeleteDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  bomId = this.data.bomId;

  constructor(
    private dialogRef: MatDialogRef<BillOfMaterialDeleteDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close(1);
  }
}
