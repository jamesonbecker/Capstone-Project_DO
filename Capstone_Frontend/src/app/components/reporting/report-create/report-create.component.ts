import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

interface Limit {
  value: number;
}

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrl: '../../../../styles.css',
})
export class ReportCreateComponent {
  limits: Limit[] = [
    { value: 5 },
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
  ];

  selectedLimit: number;
  selectDates: boolean = false;

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 5, 0, 1);
  readonly maxDate = new Date();

  readonly range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private dialogRef: MatDialogRef<ReportCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  saveDialog(): void {
    const startDate = this.range.get('start').value;
    const endDate = this.range.get('end').value;

    if (this.selectDates == false) {
      this.dialogRef.close({
        limit: this.selectedLimit,
        selectDates: this.selectDates,
        start: startDate,
        end: endDate,
        title: 'Top ' + this.selectedLimit + ' Products with Quantity Sold',
      });
    } else {
      this.dialogRef.close({
        limit: this.selectedLimit,
        start: startDate,
        end: endDate,
        title:
          'Top ' +
          this.selectedLimit +
          ' Products with Quantity Sold Between ' +
          startDate.toLocaleString() +
          ' - ' +
          endDate.toLocaleString(),
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  changeValue(value) {
    this.selectDates = !value;
  }
}
