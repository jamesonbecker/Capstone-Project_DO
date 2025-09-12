import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-part-delete-dialog',
  templateUrl: './part-delete-dialog.component.html',
  styleUrl: './part-delete-dialog.component.scss',
})
export class PartDeleteDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  sku = this.data.sku;

  constructor(private dialogRef: MatDialogRef<PartDeleteDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close(1);
  }
}
