import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from 'src/app/common/inventory';
import { InventoryService } from 'src/app/services/inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportCreateComponent } from '../report-create/report-create.component';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: '../../../../styles.css',
})
export class ReportsComponent {
  displayedColumns: string[] = [
    'adjustmentType',
    'itemSku',
    'quantity',
    'date',
  ];

  limit: number;
  selectDates: boolean;
  start: Date;
  end: Date;
  showTable = 0;
  title: string;

  dataSource = new MatTableDataSource<Inventory>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private location: Location,
    private dialog: MatDialog,
    private inventoryService: InventoryService
  ) {}

  createReport(): void {
    const dialogRef = this.dialog.open(ReportCreateComponent, {
      data: { limit: this.limit, start: this.start, end: this.end },
    });

    dialogRef.afterClosed().subscribe((dialog) => {
      if (dialog !== undefined) {
        this.limit = dialog.limit;
        this.selectDates = dialog.selectDates;
        if (this.selectDates == false) {
          this.showTable = 1;
          this.title = dialog.title;
          this.inventoryService
            .getAllInventory(this.limit)
            .subscribe((results) => {
              this.dataSource.data = results;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
        } else {
          this.start = dialog.start.toISO();
          this.end = dialog.end
            .plus({ hours: 23, minutes: 59, seconds: 59 })
            .toISO();
          this.showTable = 1;
          this.title = dialog.title;
          this.inventoryService
            .getAllInventory(this.limit)
            .subscribe((results) => {
              this.dataSource.data = results.filter(
                (item) =>
                  DateTime.fromISO(item.date).toISO() >= this.start &&
                  DateTime.fromISO(item.date).toISO() <= this.end
              );
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
