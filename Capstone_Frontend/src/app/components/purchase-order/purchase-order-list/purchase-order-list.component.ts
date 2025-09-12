import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseOrders } from 'src/app/common/purchase-orders';
import { PurchaseOrdersService } from 'src/app/services/purchase-orders.service';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderCreateDialogComponent } from '../purchase-order-create/purchase-order-create-dialog/purchase-order-create-dialog.component';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrl: '../../../../styles.css',
})
export class PurchaseOrderListComponent implements OnInit {
  displayedColumns: string[] = [
    'orderNumber',
    'orderType',
    'orderTotal',
    'dateCreated',
    'lastUpdated',
  ];

  dataSource = new MatTableDataSource<PurchaseOrders>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private purchaseOrderService: PurchaseOrdersService,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadPurchaseOrders();
  }

  loadPurchaseOrders() {
    this.purchaseOrderService.getAllPurchaseOrders().subscribe((purchaseOrders) => {
      this.dataSource.data = purchaseOrders;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createPurchaseOrder() {
    this.dialog.open(PurchaseOrderCreateDialogComponent, {
      minWidth: 400
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goBack() {
    this.location.back();
  }
}
