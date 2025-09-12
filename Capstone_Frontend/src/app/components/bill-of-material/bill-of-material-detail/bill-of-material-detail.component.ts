import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BillOfMaterialDetail } from 'src/app/common/bill-of-material-detail';
import { BillOfMaterialDetailService } from 'src/app/services/bill-of-material-detail.service';
import { BillOfMaterialService } from 'src/app/services/bill-of-material.service';
import { BillOfMaterials } from 'src/app/common/bill-of-materials';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BillOfMaterialDeleteDialogComponent } from '../bill-of-material-delete-dialog/bill-of-material-delete-dialog.component';

@Component({
  selector: 'app-bill-of-material-detail',
  templateUrl: './bill-of-material-detail.component.html',
  styleUrl: '../../../../styles.css',
})
export class BillOfMaterialDetailComponent implements OnInit {
  displayedColumns: string[] = ['part.sku', 'quantityNeeded', 'lineTotal'];

  billOfMaterialId!: number;
  billOfMaterial: BillOfMaterials;
  billOfMaterialDetails!: BillOfMaterialDetail[];

  answer: number = 0;

  dataSource = new MatTableDataSource<BillOfMaterialDetail>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private billService: BillOfMaterialService,
    private billDetailService: BillOfMaterialDetailService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.billOfMaterialId = +this.route.snapshot.paramMap.get('id')!;
    this.loadBillOfMaterial();
    this.loadBillOfMaterialDetails();
  }

  loadBillOfMaterial() {
    this.billService
      .getBillOfMaterialById(this.billOfMaterialId)
      .subscribe((bill) => {
        this.billOfMaterial = bill;
      });
  }

  loadBillOfMaterialDetails(): void {
    this.billDetailService
      .getBillDetailsByBillId(this.billOfMaterialId)
      .subscribe((details) => {
        this.dataSource.data = details;
        this.dataSource.sort = this.sort;
      });
  }

  onDelete() {
    const dialogRef = this.dialog.open(BillOfMaterialDeleteDialogComponent, {
      data: { bomId: this.billOfMaterialId, answer: this.answer },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.billService
          .deleteBillOfMaterial(this.billOfMaterialId)
          .subscribe(() => {
            this.snackBar.open(
              'Bill of Material has been deleted successfully.',
              'Close',
              {
                duration: 5000,
                panelClass: ['snackbar-success'],
              }
            );
            this.router.navigate(['/bill-of-materials']);
          });
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
